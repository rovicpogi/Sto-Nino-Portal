"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, GraduationCap, MessageSquare, Calendar, Home, Clock } from "lucide-react"

// Mock data for parent portal
const mockChildren = [
  {
    id: 1,
    name: "Miguel Torres",
    grade: "Grade 10",
    section: "St. Joseph",
    gpa: 3.85,
    attendance: 95.5,
    photo: "MT",
  },
  {
    id: 2,
    name: "Sofia Torres",
    grade: "Grade 7",
    section: "St. Mary",
    gpa: 3.92,
    attendance: 97.2,
    photo: "ST",
  },
]

const mockGrades = {
  1: [
    { subject: "Mathematics", grade: 92, status: "Excellent" },
    { subject: "Science", grade: 88, status: "Very Good" },
    { subject: "English", grade: 90, status: "Excellent" },
    { subject: "Filipino", grade: 87, status: "Very Good" },
  ],
  2: [
    { subject: "Mathematics", grade: 95, status: "Outstanding" },
    { subject: "Science", grade: 91, status: "Excellent" },
    { subject: "English", grade: 93, status: "Excellent" },
    { subject: "Filipino", grade: 89, status: "Very Good" },
  ],
}

const mockMessages = [
  {
    id: 1,
    from: "Prof. Rodriguez",
    subject: "Miguel's Math Performance",
    message: "Miguel is showing excellent progress in advanced mathematics.",
    date: "Dec 10, 2024",
    child: "Miguel Torres",
  },
  {
    id: 2,
    from: "School Admin",
    subject: "Parent-Teacher Conference",
    message: "Scheduled for December 15, 2024 at 2:00 PM",
    date: "Dec 8, 2024",
    child: "All Children",
  },
]

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedChild, setSelectedChild] = useState(1)

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/"
    }
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
                <h1 className="text-xl font-bold text-red-800">Parent Portal</h1>
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
                <p className="font-medium text-red-800">Maria Torres</p>
                <p className="text-sm text-gray-600">Parent/Guardian</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent"
              >
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
            <TabsTrigger value="grades" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <GraduationCap className="w-4 h-4 mr-2" />
              Grades & Progress
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, Maria Torres!</h2>
              <p className="text-gray-600">Here's an overview of your children's academic progress.</p>
            </div>

            {/* Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockChildren.map((child) => (
                <Card key={child.id} className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {child.photo}
                      </div>
                      <div>
                        <CardTitle className="text-red-800">{child.name}</CardTitle>
                        <CardDescription>
                          {child.grade} - {child.section}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Current GPA</p>
                        <p className="text-2xl font-bold text-green-600">{child.gpa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Attendance</p>
                        <p className="text-2xl font-bold text-blue-600">{child.attendance}%</p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-red-800 hover:bg-red-700"
                      onClick={() => {
                        setSelectedChild(child.id)
                        setActiveTab("grades")
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Miguel's Math Grade Updated</p>
                      <p className="text-sm text-gray-600">Received 92 on recent exam</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">New Message from Teacher</p>
                      <p className="text-sm text-gray-600">Prof. Rodriguez sent an update</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Upcoming Parent-Teacher Conference</p>
                      <p className="text-sm text-gray-600">December 15, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Grades & Progress</h2>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Select Child:</label>
                <select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  {mockChildren.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">
                  {mockChildren.find((c) => c.id === selectedChild)?.name}'s Current Grades
                </CardTitle>
                <CardDescription>Academic performance for current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockGrades[selectedChild as keyof typeof mockGrades]?.map((grade, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-800">{grade.subject}</h4>
                        <Badge
                          className={`${
                            grade.grade >= 90
                              ? "bg-green-100 text-green-800"
                              : grade.grade >= 85
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {grade.status}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-red-600 mt-2">{grade.grade}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Attendance Records</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockChildren.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle className="text-red-800">{child.name}</CardTitle>
                    <CardDescription>
                      {child.grade} - {child.section}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Overall Attendance</span>
                          <span className="text-sm text-gray-500">{child.attendance}%</span>
                        </div>
                        <Progress value={child.attendance} className="h-2" />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-green-50 rounded">
                          <p className="text-sm text-green-600">Present</p>
                          <p className="font-bold text-green-800">142</p>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <p className="text-sm text-red-600">Absent</p>
                          <p className="font-bold text-red-800">3</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <p className="text-sm text-yellow-600">Late</p>
                          <p className="font-bold text-yellow-800">2</p>
                        </div>
                      </div>
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
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">{message.subject}</h4>
                          <p className="text-sm text-gray-600">From: {message.from}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{message.date}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {message.child}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Class Schedules</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockChildren.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle className="text-red-800">{child.name}'s Schedule</CardTitle>
                    <CardDescription>
                      {child.grade} - {child.section}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="font-medium text-blue-800">Mathematics</span>
                        <span className="text-sm text-blue-600">8:00 AM - Room 201</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="font-medium text-green-800">Science</span>
                        <span className="text-sm text-green-600">10:00 AM - Lab 101</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="font-medium text-purple-800">English</span>
                        <span className="text-sm text-purple-600">1:00 PM - Room 105</span>
                      </div>
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
