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
  Trash2,
} from "lucide-react"

export default function TeacherPortal() {
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
  const [teacherData, setTeacherData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    classesToday: 0,
    pendingGrades: 0,
    journalEntries: 0,
    todaySchedule: [] as any[],
    announcements: [] as any[],
  })

  useEffect(() => {
    // Load teacher data from localStorage
    const user = localStorage.getItem("teacher")
    if (user) {
      setTeacherData(JSON.parse(user))
    }
    
    // Load journal entries from localStorage
    const savedEntries = localStorage.getItem(`journal_entries_${user ? JSON.parse(user).email : 'default'}`)
    if (savedEntries) {
      const entries = JSON.parse(savedEntries)
      setJournalEntries(entries)
      setDashboardStats(prev => ({ ...prev, journalEntries: entries.length }))
    }
    
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Fetch dashboard stats when component loads and teacherData is available
    if (teacherData && activeTab === "dashboard") {
      const fetchStats = async () => {
        try {
          const response = await fetch("/api/teacher/stats")
          const result = await response.json()
          if (result.success) {
            setDashboardStats(result.data)
          }
        } catch (error) {
          console.error("Failed to fetch teacher stats:", error)
        }
      }
      fetchStats()
    }
  }, [teacherData, activeTab])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("teacher")
      window.location.href = "/"
    }
  }

  const handleGradeUpdate = (studentId: number, subject: string, newGrade: number) => {
    console.log(`Updating ${subject} grade for student ${studentId} to ${newGrade}`)
  }

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newEntry = {
      id: Date.now(),
      ...journalEntry,
      createdAt: new Date().toISOString(),
    }
    
    const updatedEntries = [newEntry, ...journalEntries]
    setJournalEntries(updatedEntries)
    
    // Save to localStorage
    const user = localStorage.getItem("teacher")
    const email = user ? JSON.parse(user).email : 'default'
    localStorage.setItem(`journal_entries_${email}`, JSON.stringify(updatedEntries))
    
    // Update dashboard stats
    setDashboardStats(prev => ({ ...prev, journalEntries: updatedEntries.length }))
    
    setShowAddJournal(false)
    setJournalEntry({ date: "", subject: "", topic: "", activities: "", notes: "" })
  }
  
  const handleDeleteJournal = (id: number) => {
    if (confirm("Are you sure you want to delete this journal entry?")) {
      const updatedEntries = journalEntries.filter(entry => entry.id !== id)
      setJournalEntries(updatedEntries)
      
      // Save to localStorage
      const user = localStorage.getItem("teacher")
      const email = user ? JSON.parse(user).email : 'default'
      localStorage.setItem(`journal_entries_${email}`, JSON.stringify(updatedEntries))
      
      // Update dashboard stats
      setDashboardStats(prev => ({ ...prev, journalEntries: updatedEntries.length }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the Teacher Portal</p>
          <Link href="/">
            <Button className="bg-red-800 hover:bg-red-700">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-red-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Image
                src="/logo.png"
                alt="Sto Niño de Praga Academy Logo"
                width={60}
                height={60}
                className="rounded-full hidden sm:block"
              />
              <div>
                <h1 className="text-base sm:text-xl font-bold text-red-800">Teacher Portal</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Sto Niño de Praga Academy</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white text-xs sm:text-sm">
                  <Home className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              <div className="text-right hidden sm:block">
                <p className="font-medium text-red-800 text-sm">
                  {teacherData?.first_name} {teacherData?.last_name}
                </p>
                <p className="text-xs text-gray-600">
                  {teacherData?.subject || teacherData?.department || "Teacher"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-8 gap-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <GraduationCap className="w-4 h-4 mr-2" />
              Manage Grades
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Teaching Journal
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">{dashboardStats.totalStudents}</div>
                  <p className="text-xs text-gray-600">Across all classes</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Classes Today</CardTitle>
                  <Calendar className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">{dashboardStats.classesToday}</div>
                  <p className="text-xs text-gray-600">{teacherData?.subject || "Scheduled classes"}</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Pending Grades</CardTitle>
                  <FileText className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">{dashboardStats.pendingGrades}</div>
                  <p className="text-xs text-gray-600">Need to be updated</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Journal Entries</CardTitle>
                  <BookOpen className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">{dashboardStats.journalEntries}</div>
                  <p className="text-xs text-gray-600">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardStats.todaySchedule.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardStats.todaySchedule.map((schedule: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="font-medium">{schedule.title}</p>
                            <p className="text-sm text-gray-600">{schedule.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No schedule available for today
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800">Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardStats.announcements.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardStats.announcements.map((announcement: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Bell className="w-4 h-4 text-red-600 mt-1" />
                          <div>
                            <p className="font-medium">{announcement.title}</p>
                            <p className="text-sm text-gray-600">{announcement.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No announcements available
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Grades Management Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Student Grades Management</CardTitle>
                <CardDescription>View and update student grades for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select defaultValue="grade7a">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade7a">Grade 7-A</SelectItem>
                      <SelectItem value="grade7b">Grade 7-B</SelectItem>
                      <SelectItem value="grade8a">Grade 8-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Grade Level</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                        No student records found. Data will be loaded from database.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                {journalEntries.length > 0 ? (
                  <div className="space-y-4">
                    {journalEntries.map((entry) => (
                      <Card key={entry.id} className="border-l-4 border-l-red-800">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{entry.topic}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {entry.subject} • {new Date(entry.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteJournal(entry.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Activities Conducted:</p>
                              <p className="text-sm text-gray-600">{entry.activities}</p>
                            </div>
                            {entry.notes && (
                              <div>
                                <p className="text-sm font-medium text-gray-700">Notes & Observations:</p>
                                <p className="text-sm text-gray-600">{entry.notes}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No journal entries found. Click "Add Entry" to create your first journal entry.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
