"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Clock,
  BarChart3,
  Settings,
  Home,
  Shield,
  FileText,
  Calendar,
  DollarSign,
  Lock,
  Mail,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Admin {
  id: number
  email: string
  name?: string
  first_name?: string
  last_name?: string
  [key: string]: any
}

interface Student {
  id: number
  name: string
  student_id: string
  grade_level: string
  section: string
  email?: string
  phone?: string
  status?: string
  created_at?: string
}

export default function AdminPortal() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    gradeLevel: "",
    section: "",
    email: "",
    phone: "",
  })
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    attendanceRate: 0,
  })
  const [students, setStudents] = useState<Student[]>([])
  const [loadingStats, setLoadingStats] = useState(false)
  const [loadingStudents, setLoadingStudents] = useState(false)

  // Fetch stats from API
  const fetchStats = async () => {
    setLoadingStats(true)
    try {
      const response = await fetch("/api/admin/stats")
      const result = await response.json()
      if (result.success && result.data) {
        setStats(result.data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoadingStats(false)
    }
  }

  // Fetch students from API
  const fetchStudents = async () => {
    setLoadingStudents(true)
    try {
      const response = await fetch("/api/admin/students")
      const result = await response.json()
      if (result.success && result.students) {
        setStudents(result.students)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoadingStudents(false)
    }
  }

  // Check if admin is logged in on component mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin)
        setAdmin(adminData)
        // Fetch data after admin is loaded
        fetchStats()
        fetchStudents()
      } catch (error) {
        console.error("Error parsing stored admin data:", error)
        localStorage.removeItem("admin")
      }
    }
    setIsLoading(false)
  }, [])

  // Fetch students when tab changes to students
  useEffect(() => {
    if (admin && activeTab === "students") {
      fetchStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }))
        setLoginError(errorData.error || `Server error (${response.status}). Please try again.`)
        return
      }

      const data = await response.json()

      if (data.success && data.admin) {
        setAdmin(data.admin)
        localStorage.setItem("admin", JSON.stringify(data.admin))
        setLoginEmail("")
        setLoginPassword("")
        setLoginError(null)
        // Fetch data after successful login
        fetchStats()
        fetchStudents()
      } else {
        setLoginError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
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
      localStorage.removeItem("admin")
      setAdmin(null)
      window.location.href = "/"
    }
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      })

      const data = await response.json()

      if (data.success) {
        alert("Student added successfully!")
        setShowAddStudent(false)
        setNewStudent({
          name: "",
          studentId: "",
          gradeLevel: "",
          section: "",
          email: "",
          phone: "",
        })
        // Refresh the students list
        fetchStudents()
        fetchStats()
      } else {
        alert(data.error || "Failed to add student. Please try again.")
      }
    } catch (error) {
      console.error("Add student error:", error)
      alert("Error adding student. Please try again.")
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-red-800">Loading...</div>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!admin) {
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
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
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
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border-gray-300"
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-gray-300"
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {loginError}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-700"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center">
                <Link href="/" className="text-sm text-gray-600 hover:text-red-800">
                  <Home className="w-4 h-4 inline mr-1" />
                  Back to Home
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
                <h1 className="text-xl font-bold text-red-800">Admin Portal</h1>
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
                <p className="font-medium text-red-800">
                  {admin.name || admin.first_name || admin.email || "Admin User"}
                </p>
                <p className="text-sm text-gray-600">System Administrator</p>
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
            <TabsTrigger value="attendance" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <Clock className="w-4 h-4 mr-2" />
              Attendance & RFID
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Student Management
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports & Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* Admin Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">
                    {loadingStats ? "..." : stats.totalStudents.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">All grade levels</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Total Teachers</CardTitle>
                  <Shield className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">
                    {loadingStats ? "..." : stats.totalTeachers.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">Active teachers</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">₱2.4M</div>
                  <p className="text-xs text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Attendance Rate</CardTitle>
                  <Calendar className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">94.2%</div>
                  <p className="text-xs text-gray-600">Overall average</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">New teacher registered</p>
                        <p className="text-sm text-gray-600">Maria Santos - Mathematics</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium">Student enrollment completed</p>
                        <p className="text-sm text-gray-600">25 new students for Grade 7</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="font-medium">Monthly report generated</p>
                        <p className="text-sm text-gray-600">Academic performance summary</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">RFID System</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Student Portal</span>
                      <Badge className="bg-green-100 text-green-800">Running</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Teacher Portal</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database Backup</span>
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance and RFID */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Attendance and RFID Management</CardTitle>
                <CardDescription>Monitor attendance records and RFID system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Today's Attendance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Students Present</span>
                        <span className="font-medium">1,178 / 1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Teachers Present</span>
                        <span className="font-medium">62 / 65</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Rate</span>
                        <span className="font-medium text-green-600">94.5%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">RFID System Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>System Status</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Cards</span>
                        <span className="font-medium">1,312</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Sync</span>
                        <span className="font-medium">2 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Management */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Student Management</CardTitle>
                <CardDescription>Manage student records, enrollment, and academic information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Student Records</h4>
                    <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                      <DialogTrigger asChild>
                        <Button className="bg-red-800 hover:bg-red-700">Add New Student</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-red-800">Add New Student</DialogTitle>
                          <DialogDescription>Enter the student's information to add them to the system</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddStudent} className="space-y-4">
                          <div>
                            <Label htmlFor="studentName">Full Name *</Label>
                            <Input
                              id="studentName"
                              value={newStudent.name}
                              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="studentId">Student ID *</Label>
                            <Input
                              id="studentId"
                              value={newStudent.studentId}
                              onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="gradeLevel">Grade Level *</Label>
                              <Select onValueChange={(value) => setNewStudent({ ...newStudent, gradeLevel: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="grade1">Grade 1</SelectItem>
                                  <SelectItem value="grade2">Grade 2</SelectItem>
                                  <SelectItem value="grade3">Grade 3</SelectItem>
                                  <SelectItem value="grade4">Grade 4</SelectItem>
                                  <SelectItem value="grade5">Grade 5</SelectItem>
                                  <SelectItem value="grade6">Grade 6</SelectItem>
                                  <SelectItem value="grade7">Grade 7</SelectItem>
                                  <SelectItem value="grade8">Grade 8</SelectItem>
                                  <SelectItem value="grade9">Grade 9</SelectItem>
                                  <SelectItem value="grade10">Grade 10</SelectItem>
                                  <SelectItem value="grade11">Grade 11</SelectItem>
                                  <SelectItem value="grade12">Grade 12</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="section">Section *</Label>
                              <Input
                                id="section"
                                value={newStudent.section}
                                onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newStudent.email}
                              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={newStudent.phone}
                              onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddStudent(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-red-800 hover:bg-red-700">
                              Add Student
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade Level</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingStudents ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500">
                            Loading students...
                          </TableCell>
                        </TableRow>
                      ) : students.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500">
                            No students found. Add a student to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.student_id || "N/A"}</TableCell>
                            <TableCell>{student.name || "N/A"}</TableCell>
                            <TableCell>{student.grade_level || "N/A"}</TableCell>
                            <TableCell>{student.section || "N/A"}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                {student.status || "Enrolled"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports and Analytics */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Reports and Analytics</CardTitle>
                <CardDescription>Generate and view various school reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-sm">Academic Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        Grade Reports
                      </Button>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        Attendance Reports
                      </Button>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        Performance Analytics
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Student Progress Reports
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-sm">Administrative Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        Enrollment Reports
                      </Button>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        Financial Reports
                      </Button>
                      <Button variant="outline" className="w-full mb-2 bg-transparent">
                        System Usage Reports
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Custom Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">System Settings</CardTitle>
                <CardDescription>Configure system preferences and administrative settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">General Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="schoolName">School Name</Label>
                        <Input id="schoolName" defaultValue="Sto Niño de Praga Academy" />
                      </div>
                      <div>
                        <Label htmlFor="academicYear">Academic Year</Label>
                        <Input id="academicYear" defaultValue="2024-2025" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">System Configuration</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Automatic Backup</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>RFID Integration</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Student Portal Access</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Teacher Portal Access</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-red-800 hover:bg-red-700">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
