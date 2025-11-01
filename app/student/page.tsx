"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Menu,
  X,
  LogOut,
} from "lucide-react"

export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [studentData, setStudentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Load student data from localStorage
    const student = localStorage.getItem("student")
    if (student) {
      setStudentData(JSON.parse(student))
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("student")
      window.location.href = "/"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the Student Portal</p>
          <Link href="/">
            <Button className="bg-red-800 hover:bg-red-700">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/logo.png"
              alt="Sto Niño de Praga Academy Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-800">Student Portal</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Sto Niño de Praga Academy</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden md:block">
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hidden sm:flex"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
            <div className="flex items-center space-x-2 hidden sm:flex">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {studentData?.first_name?.[0] || 'S'}{studentData?.last_name?.[0] || 'T'}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  {studentData?.first_name} {studentData?.last_name}
                </p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white min-h-screen border-r border-gray-200">
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
          </nav>
        </aside>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="mt-4">
                <div className="px-4 space-y-1">
                  <button
                    onClick={() => {
                      setActiveNav("dashboard")
                      setMobileMenuOpen(false)
                    }}
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
                    onClick={() => {
                      setActiveNav("enrollment")
                      setMobileMenuOpen(false)
                    }}
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
                    onClick={() => {
                      setActiveNav("schedule")
                      setMobileMenuOpen(false)
                    }}
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
                    onClick={() => {
                      setActiveNav("grades")
                      setMobileMenuOpen(false)
                    }}
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
                    onClick={() => {
                      setActiveNav("profile")
                      setMobileMenuOpen(false)
                    }}
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

                {/* Mobile User Info */}
                <div className="mt-8 px-4 py-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
                      {studentData?.first_name?.[0] || 'S'}{studentData?.last_name?.[0] || 'T'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {studentData?.first_name} {studentData?.last_name}
                      </p>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Welcome back, {studentData?.first_name}!
                </h2>
                <p className="text-sm sm:text-base text-gray-600">Here's your academic overview for today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Current GPA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Loading data...</span>
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
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Loading data...</span>
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
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Loading data...</span>
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
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="flex items-center mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">Loading data...</span>
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
                    <div className="text-center text-gray-500 py-8">
                      No assignments found. Data will be loaded from database.
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
                    <div className="text-center text-gray-500 py-8">
                      No course progress data found. Data will be loaded from database.
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
                    <div className="text-center text-gray-500 py-8">
                      No enrollment data found. Data will be loaded from database.
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
                  <div className="text-center text-gray-500 py-8">
                    No schedule data found. Data will be loaded from database.
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
                  <div className="text-center text-gray-500 py-8">
                    No grades data found. Data will be loaded from database.
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
                        {studentData?.first_name} {studentData?.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                      <p className="text-gray-900">{studentData?.student_id || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                      <p className="text-gray-900">{studentData?.grade_level || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                      <p className="text-gray-900">{studentData?.section || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{studentData?.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <p className="text-gray-900">{studentData?.contact_number || "N/A"}</p>
                    </div>
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
