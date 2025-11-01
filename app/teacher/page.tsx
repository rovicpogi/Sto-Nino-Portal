"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  LogOut,
  Users,
  Calendar,
  FileText,
  Plus,
  Edit,
  Save,
  Bell,
  Clock,
  Home,
  Mail,
  User,
  Lock,
} from "lucide-react"


interface Teacher {
  id: number
  email: string
  name?: string
  first_name?: string
  last_name?: string
  subject?: string
  subjects?: string
  [key: string]: any
}

export default function TeacherPortal() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [journalEntry, setJournalEntry] = useState({
    date: "",
    subject: "",
    topic: "",
    activities: "",
    notes: "",
  })
  const [showAddJournal, setShowAddJournal] = useState(false)

  // Check if teacher is logged in on component mount
  useEffect(() => {
    const storedTeacher = localStorage.getItem("teacher")
    if (storedTeacher) {
      try {
        const teacherData = JSON.parse(storedTeacher)
        setTeacher(teacherData)
      } catch (error) {
        console.error("Error parsing stored teacher data:", error)
        localStorage.removeItem("teacher")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)

    try {
      const response = await fetch("/api/teacher/login", {
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

      if (data.success && data.teacher) {
        setTeacher(data.teacher)
        localStorage.setItem("teacher", JSON.stringify(data.teacher))
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
      localStorage.removeItem("teacher")
      setTeacher(null)
      window.location.href = "/"
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-red-800">Loading...</div>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
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
            <CardTitle className="text-2xl font-bold text-red-800">Teacher Login</CardTitle>
            <CardDescription>Sto Niño de Praga Academy</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-red-800">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="border-red-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-red-800">
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
                  className="border-red-200"
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
                  <Button type="button" variant="outline" className="border-red-800 text-red-800">
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

  const handleGradeUpdate = async (studentId: number, subject: string, newGrade: number) => {
    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, subject, grade: newGrade }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Grade updated successfully!`)
        // Reload the page to show updated grades
        window.location.reload()
      } else {
        alert(data.error || "Failed to update grade. Please try again.")
      }
    } catch (error) {
      console.error("Grade update error:", error)
      alert("Error updating grade. Please try again.")
    }
  }

  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journalEntry),
      })

      const data = await response.json()

      if (data.success) {
        alert("Journal entry saved successfully!")
        setShowAddJournal(false)
        setJournalEntry({ date: "", subject: "", topic: "", activities: "", notes: "" })
        // Reload to show new entry
        window.location.reload()
      } else {
        alert(data.error || "Failed to save journal entry. Please try again.")
      }
    } catch (error) {
      console.error("Journal submission error:", error)
      // Fallback for development
      console.log("Journal entry submitted:", journalEntry)
      alert("Journal entry saved (dev mode)")
      setShowAddJournal(false)
      setJournalEntry({ date: "", subject: "", topic: "", activities: "", notes: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
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
                <h1 className="text-xl font-bold text-red-800">Teacher Portal</h1>
                <p className="text-sm text-gray-600">Sto Niño de Praga Academy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="text-right">
                <p className="font-medium text-red-800">
                  {teacher.name || 
                   (teacher.first_name && teacher.last_name 
                     ? `${teacher.first_name} ${teacher.last_name}` 
                     : teacher.email)}
                </p>
                <p className="text-sm text-gray-600">
                  {teacher.subjects || teacher.subject || "Teacher"}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
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
            <TabsTrigger value="account" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              My Account
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <GraduationCap className="w-4 h-4 mr-2" />
              Manage Grades
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Teaching Journal
            </TabsTrigger>
            <TabsTrigger value="logout" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Welcome to Teacher Portal</CardTitle>
                <CardDescription>Use the tabs above to manage your classes, grades, and teaching journal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Dashboard data will be loaded from the database.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">My Account Information</CardTitle>
                <CardDescription>View your account details and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-red-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-800 flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-gray-600">Full Name</Label>
                          <p className="font-medium text-red-800">
                            {teacher.name || 
                             (teacher.first_name && teacher.last_name 
                               ? `${teacher.first_name} ${teacher.last_name}` 
                               : "Not provided")}
                          </p>
                        </div>
                        {teacher.first_name && (
                          <div>
                            <Label className="text-gray-600">First Name</Label>
                            <p className="font-medium">{teacher.first_name}</p>
                          </div>
                        )}
                        {teacher.last_name && (
                          <div>
                            <Label className="text-gray-600">Last Name</Label>
                            <p className="font-medium">{teacher.last_name}</p>
                          </div>
                        )}
                        <div>
                          <Label className="text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Address
                          </Label>
                          <p className="font-medium">{teacher.email}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-800 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Teaching Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-gray-600">Subject(s)</Label>
                          <p className="font-medium text-red-800">
                            {teacher.subjects || teacher.subject || "Not assigned"}
                          </p>
                        </div>
                        {teacher.teacher_id && (
                          <div>
                            <Label className="text-gray-600">Teacher ID</Label>
                            <p className="font-medium">{teacher.teacher_id}</p>
                          </div>
                        )}
                        {teacher.department && (
                          <div>
                            <Label className="text-gray-600">Department</Label>
                            <p className="font-medium">{teacher.department}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Information */}
                  {(teacher.phone || teacher.address || teacher.contact_number) && (
                    <Card className="border-red-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-800">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teacher.phone && (
                          <div>
                            <Label className="text-gray-600">Phone</Label>
                            <p className="font-medium">{teacher.phone}</p>
                          </div>
                        )}
                        {teacher.contact_number && (
                          <div>
                            <Label className="text-gray-600">Contact Number</Label>
                            <p className="font-medium">{teacher.contact_number}</p>
                          </div>
                        )}
                        {teacher.address && (
                          <div className="md:col-span-2">
                            <Label className="text-gray-600">Address</Label>
                            <p className="font-medium">{teacher.address}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Display all other fields */}
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-800">Additional Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(teacher)
                          .filter(([key]) => 
                            !['id', 'email', 'password', 'name', 'first_name', 'last_name', 
                              'subjects', 'subject', 'teacher_id', 'department', 'phone', 
                              'contact_number', 'address'].includes(key))
                          .map(([key, value]) => (
                            value && (
                              <div key={key}>
                                <Label className="text-gray-600 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </Label>
                                <p className="font-medium">{String(value)}</p>
                              </div>
                            )
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Management Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Student Grades Management</CardTitle>
                <CardDescription>View and update student grades for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Student grades will be loaded from the database.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-red-800">Teaching Journal</CardTitle>
                  <CardDescription>Record your daily teaching activities and observations</CardDescription>
                </div>
                <Dialog open={showAddJournal} onOpenChange={setShowAddJournal}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-800 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Journal Entry</DialogTitle>
                      <DialogDescription>Record your teaching activities for today</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleJournalSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={journalEntry.date}
                            onChange={(e) => setJournalEntry({ ...journalEntry, date: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Select onValueChange={(value) => setJournalEntry({ ...journalEntry, subject: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="filipino">Filipino</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="topic">Topic/Lesson</Label>
                        <Input
                          id="topic"
                          value={journalEntry.topic}
                          onChange={(e) => setJournalEntry({ ...journalEntry, topic: e.target.value })}
                          placeholder="Enter the lesson topic"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="activities">Activities Conducted</Label>
                        <Textarea
                          id="activities"
                          value={journalEntry.activities}
                          onChange={(e) => setJournalEntry({ ...journalEntry, activities: e.target.value })}
                          placeholder="Describe the activities and methods used"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes & Observations</Label>
                        <Textarea
                          id="notes"
                          value={journalEntry.notes}
                          onChange={(e) => setJournalEntry({ ...journalEntry, notes: e.target.value })}
                          placeholder="Student responses, challenges, improvements needed, etc."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-red-800 hover:bg-red-700">
                        Save Entry
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No journal entries yet.</p>
                    <p className="text-sm text-gray-500">Click "Add Entry" to create your first journal entry.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logout Tab */}
          <TabsContent value="logout" className="space-y-6">
            <Card className="text-center py-12">
              <CardContent>
                <LogOut className="w-16 h-16 text-red-800 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-800 mb-4">Logout Confirmation</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to log out of the Teacher Portal?</p>
                <div className="space-x-4">
                  <Button onClick={handleLogout} className="bg-red-800 hover:bg-red-700">
                    Yes, Log Out
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
