"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  User,
  Home,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  LogOut,
  Mail,
  Lock,
} from "lucide-react"

interface Student {
  id: number
  email: string
  name?: string
  first_name?: string
  last_name?: string
  student_id?: string
  grade_level?: string
  section?: string
  [key: string]: any
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [activeNav, setActiveNav] = useState("dashboard")

  // Check if student is logged in on component mount
  useEffect(() => {
    const storedStudent = localStorage.getItem("student")
    if (storedStudent) {
      try {
        const studentData = JSON.parse(storedStudent)
        setStudent(studentData)
      } catch (error) {
        console.error("Error parsing stored student data:", error)
        localStorage.removeItem("student")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      // Check if response is ok
      if (!response.ok) {
        // Try to parse error message
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }))
        setLoginError(errorData.error || `Server error (${response.status}). Please try again.`)
        return
      }

      const data = await response.json()

      if (data.success && data.student) {
        setStudent(data.student)
        localStorage.setItem("student", JSON.stringify(data.student))
        setLoginEmail("")
        setLoginPassword("")
        setLoginError(null)
      } else {
        setLoginError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      // Provide more specific error messages
      const errorMessage = error?.message || String(error) || ''
      if (errorMessage && (errorMessage.includes('fetch') || errorMessage.includes('network'))) {
        setLoginError("Network error. Please check your internet connection and try again.")
      } else if (errorMessage && errorMessage.includes('Failed to fetch')) {
        setLoginError("Cannot connect to the server. Please make sure the server is running.")
      } else {
        setLoginError(`An error occurred: ${errorMessage || 'Please try again.'}`)
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("student")
      setStudent(null)
      window.location.href = "/"
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">Loading...</div>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-gray-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Sto Niño de Praga Academy Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Student Login</CardTitle>
            <CardDescription>Sto Niño de Praga Academy</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="border-gray-200"
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {loginError}
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-red-800 hover:bg-red-700"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center">
                <Link href="/">
                  <Button type="button" variant="outline" className="border-gray-300 text-gray-700">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Sto Niño de Praga Academy Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Student Portal</h1>
              <p className="text-xs text-gray-500">Sto Niño de Praga Academy</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {student.name 
                    ? student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    : student.first_name && student.last_name
                    ? `${student.first_name[0]}${student.last_name[0]}`.toUpperCase()
                    : student.email[0].toUpperCase()}
              </div>
              <div className="text-sm">
                  <p className="font-medium text-gray-800">
                    {student.name || 
                     (student.first_name && student.last_name 
                       ? `${student.first_name} ${student.last_name}` 
                       : student.email)}
                  </p>
                <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen border-r border-gray-200">
          <nav className="mt-6">
            <div className="px-4 space-y-1">
              <button
                onClick={() => setActiveNav("dashboard")}
                className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors ${
                  activeNav === "dashboard"
                    ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-3" />
                Dashboard
              </button>

              <button
                onClick={() => setActiveNav("enrollment")}
                className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors ${
                  activeNav === "enrollment"
                    ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FileText className="w-4 h-4 mr-3" />
                Enrollment
              </button>

              <button
                onClick={() => setActiveNav("schedule")}
                className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors ${
                  activeNav === "schedule"
                    ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Calendar className="w-4 h-4 mr-3" />
                Schedule Calendar
              </button>

              <button
                onClick={() => setActiveNav("grades")}
                className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors ${
                  activeNav === "grades"
                    ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <GraduationCap className="w-4 h-4 mr-3" />
                Grades & Reports
              </button>

              <button
                onClick={() => setActiveNav("profile")}
                className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors ${
                  activeNav === "profile"
                    ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
            </div>

            <div className="mt-8 px-4">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50" size="sm">
                  <Home className="w-4 h-4 mr-3" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Welcome back, {student.name || 
                    (student.first_name && student.last_name 
                      ? `${student.first_name} ${student.last_name}` 
                      : 'Student')}!
                </h2>
                <p className="text-gray-600">Here's your academic overview for today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Current GPA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">-</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Not available</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Attendance Rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">-</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Not available</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Active Courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">-</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Not available</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Pending Tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">-</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Not available</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Assignments and Course Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Assignments */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recent Assignments</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Your latest assignments and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No assignments available.</p>
                      <p className="text-sm text-gray-500 mt-2">Assignments will be loaded from the database.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Progress */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Course Progress</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Your progress in current subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No course progress data available.</p>
                      <p className="text-sm text-gray-500 mt-2">Course progress will be loaded from the database.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeNav === "enrollment" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Enrollment</h2>
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle>Enrollment Status</CardTitle>
                  <CardDescription>Your current enrollment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <h4 className="font-medium text-green-800">Enrollment Status</h4>
                        <p className="text-sm text-green-600">
                          {student.grade_level 
                            ? `Currently Enrolled - ${student.grade_level}` 
                            : 'Enrollment status will be loaded from the database'}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800">Academic Year</h4>
                      <p className="text-sm text-gray-600">Academic year information will be loaded from the database.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeNav === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Calendar</h2>
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>Your weekly class schedule and important dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4 text-red-800">Today's Classes</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div>
                            <h5 className="font-medium text-blue-800">Mathematics</h5>
                            <p className="text-sm text-blue-600">Room 201 - Prof. Rodriguez</p>
                          </div>
                          <span className="text-sm font-medium text-blue-600">8:00 AM</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <h5 className="font-medium text-green-800">Science</h5>
                            <p className="text-sm text-green-600">Lab 101 - Prof. Santos</p>
                          </div>
                          <span className="text-sm font-medium text-green-600">10:00 AM</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div>
                            <h5 className="font-medium text-purple-800">English</h5>
                            <p className="text-sm text-purple-600">Room 105 - Prof. Garcia</p>
                          </div>
                          <span className="text-sm font-medium text-purple-600">1:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4 text-red-800">Upcoming Events</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <h5 className="font-medium text-orange-800">Math Quiz</h5>
                          <p className="text-sm text-orange-600">December 20, 2024</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <h5 className="font-medium text-red-800">Science Project Due</h5>
                          <p className="text-sm text-red-600">December 22, 2024</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <h5 className="font-medium text-indigo-800">Christmas Break</h5>
                          <p className="text-sm text-indigo-600">December 23 - January 3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeNav === "grades" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Grades & Reports</h2>
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle>Current Grades</CardTitle>
                  <CardDescription>Your grades for the current semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No grades available.</p>
                    <p className="text-sm text-gray-500 mt-2">Grades will be loaded from the database.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeNav === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your student profile and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-gray-900">
                        {student.name || 
                         (student.first_name && student.last_name 
                           ? `${student.first_name} ${student.last_name}` 
                           : "Not provided")}
                      </p>
                    </div>
                    {student.first_name && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <p className="text-gray-900">{student.first_name}</p>
                      </div>
                    )}
                    {student.last_name && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <p className="text-gray-900">{student.last_name}</p>
                      </div>
                    )}
                    {student.student_id && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                        <p className="text-gray-900">{student.student_id}</p>
                    </div>
                    )}
                    {student.grade_level && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                        <p className="text-gray-900">{student.grade_level}</p>
                    </div>
                    )}
                    {student.section && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <p className="text-gray-900">{student.section}</p>
                    </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </label>
                      <p className="text-gray-900">{student.email}</p>
                    </div>
                    {(student.phone || student.contact_number) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <p className="text-gray-900">{student.phone || student.contact_number}</p>
                      </div>
                    )}
                    {(student.address) && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <p className="text-gray-900">{student.address}</p>
                      </div>
                    )}
                    {/* Display any additional fields */}
                    {Object.entries(student)
                      .filter(([key]) => 
                        !['id', 'email', 'password', 'Password', 'name', 'first_name', 'last_name', 
                          'student_id', 'grade_level', 'section', 'phone', 'contact_number', 'address'].includes(key))
                      .map(([key, value]) => (
                        value && (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                              {key.replace(/_/g, ' ')}
                            </label>
                            <p className="text-gray-900">{String(value)}</p>
                    </div>
                        )
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
