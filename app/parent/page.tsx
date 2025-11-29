"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, GraduationCap, MessageSquare, Calendar, Home, Clock, LogOut, User, Eye } from "lucide-react"

interface Child {
  id: string | number
  name: string
  student_id?: string
  grade_level?: string
  section?: string
  email?: string
  photo?: string
}

export default function ParentPortal() {
  const router = useRouter()
  const [parent, setParent] = useState<any>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if parent is logged in
    const parentData = localStorage.getItem("parent")
    const childrenData = localStorage.getItem("parentChildren")

    if (!parentData) {
      router.push("/")
      return
    }

    try {
      setParent(JSON.parse(parentData))
      if (childrenData) {
        const parsedChildren = JSON.parse(childrenData)
        setChildren(parsedChildren)
        if (parsedChildren.length > 0) {
          setSelectedChild(parsedChildren[0])
        }
      }
    } catch (error) {
      console.error("Error parsing parent data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("parent")
      localStorage.removeItem("parentChildren")
      router.push("/")
    }
  }

  const handleViewStudentPage = (child: Child) => {
    // Store child data temporarily and redirect to student page
    localStorage.setItem("student", JSON.stringify(child))
    window.open(`/student?parentView=true`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!parent || children.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Children Found</CardTitle>
            <CardDescription>
              You don't have any children linked to your account. Please contact the school administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-red-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Sto Niño de Praga Academy Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-red-800">Parent/Guardian Portal</h1>
                <p className="text-sm text-gray-600">Sto Niño de Praga Academy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="text-right">
                <p className="font-medium text-red-800">{parent.name || parent.email || "Parent/Guardian"}</p>
                <p className="text-sm text-gray-600">Parent/Guardian</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="children" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              My Children
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <Clock className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {parent.name || parent.email || "Parent/Guardian"}!
              </h2>
              <p className="text-gray-600">Here's an overview of your children's academic progress.</p>
            </div>

            {/* Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                          {child.photo || child.name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <CardTitle className="text-red-800">{child.name}</CardTitle>
                          <CardDescription>
                            {child.grade_level || "N/A"} - {child.section || "N/A"}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleViewStudentPage(child)}
                        variant="outline"
                        size="sm"
                        className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Student Page
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">Student ID</p>
                        <p className="font-medium">{child.student_id || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-sm">{child.email || "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Children Tab */}
          <TabsContent value="children" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Children</h2>
              <p className="text-gray-600">View and access your children's student portals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="border-red-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {child.photo || child.name?.charAt(0) || "S"}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-red-800">{child.name}</CardTitle>
                        <CardDescription>
                          {child.grade_level || "N/A"} - {child.section || "N/A"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Student ID</p>
                        <p className="font-medium">{child.student_id || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-sm">{child.email || "N/A"}</p>
                      </div>
                      <Button
                        onClick={() => handleViewStudentPage(child)}
                        className="w-full bg-red-800 hover:bg-red-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Student Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Attendance Records</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle className="text-red-800">{child.name}</CardTitle>
                    <CardDescription>
                      {child.grade_level || "N/A"} - {child.section || "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Overall Attendance</span>
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        Click "View Student Portal" to see detailed attendance records
                      </p>
                      <Button
                        onClick={() => handleViewStudentPage(child)}
                        variant="outline"
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Student Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Recent Messages</CardTitle>
                <CardDescription>Communications from teachers and school administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No messages yet.</p>
                  <p className="text-sm mt-2">Messages from teachers will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Class Schedules</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle className="text-red-800">{child.name}'s Schedule</CardTitle>
                    <CardDescription>
                      {child.grade_level || "N/A"} - {child.section || "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Schedule information available in student portal.</p>
                      <Button
                        onClick={() => handleViewStudentPage(child)}
                        variant="outline"
                        className="mt-4"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Student Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
