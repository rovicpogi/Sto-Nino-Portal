"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"

// Mock data
const mockStudents = [
  { id: 1, name: "Juan Dela Cruz", grade: "Grade 7-A", math: 85, english: 90, science: 88, filipino: 87 },
  { id: 2, name: "Maria Santos", grade: "Grade 7-A", math: 92, english: 89, science: 91, filipino: 93 },
  { id: 3, name: "Pedro Garcia", grade: "Grade 7-A", math: 78, english: 82, science: 80, filipino: 79 },
  { id: 4, name: "Ana Reyes", grade: "Grade 7-A", math: 95, english: 94, science: 96, filipino: 92 },
  { id: 5, name: "Carlos Lopez", grade: "Grade 7-A", math: 83, english: 85, science: 84, filipino: 86 },
]

const mockJournalEntries = [
  {
    id: 1,
    date: "2024-01-15",
    subject: "Mathematics",
    topic: "Algebraic Expressions",
    activities: "Introduced basic algebraic concepts, solved sample problems",
    notes: "Students showed good understanding. Need more practice on word problems.",
  },
  {
    id: 2,
    date: "2024-01-14",
    subject: "English",
    topic: "Creative Writing",
    activities: "Essay writing exercise on 'My Dream Vacation'",
    notes: "Excellent creativity shown by most students. Grammar needs improvement.",
  },
]

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

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/"
    }
  }

  const handleGradeUpdate = (studentId: number, subject: string, newGrade: number) => {
    console.log(`Updating ${subject} grade for student ${studentId} to ${newGrade}`)
  }

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Journal entry submitted:", journalEntry)
    setShowAddJournal(false)
    setJournalEntry({ date: "", subject: "", topic: "", activities: "", notes: "" })
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
                <p className="font-medium text-red-800">Prof. Maria Rodriguez</p>
                <p className="text-sm text-gray-600">Mathematics & Science</p>
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
            <TabsTrigger value="logout" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
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
                  <div className="text-2xl font-bold text-red-800">32</div>
                  <p className="text-xs text-gray-600">Across all classes</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Classes Today</CardTitle>
                  <Calendar className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">5</div>
                  <p className="text-xs text-gray-600">Mathematics & Science</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Pending Grades</CardTitle>
                  <FileText className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">8</div>
                  <p className="text-xs text-gray-600">Need to be updated</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Journal Entries</CardTitle>
                  <BookOpen className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">15</div>
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
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="font-medium">Mathematics - Grade 7A</p>
                        <p className="text-sm text-gray-600">8:00 AM - 9:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="font-medium">Science - Grade 7B</p>
                        <p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="font-medium">Mathematics - Grade 8A</p>
                        <p className="text-sm text-gray-600">1:00 PM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800">Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Bell className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Parent-Teacher Conference</p>
                        <p className="text-sm text-gray-600">Scheduled for January 25-26, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Bell className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Grade Submission Deadline</p>
                        <p className="text-sm text-gray-600">All grades due by January 30, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Bell className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Faculty Meeting</p>
                        <p className="text-sm text-gray-600">February 2, 2024 at 3:00 PM</p>
                      </div>
                    </div>
                  </div>
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
                      <TableHead>Mathematics</TableHead>
                      <TableHead>English</TableHead>
                      <TableHead>Science</TableHead>
                      <TableHead>Filipino</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => {
                      const average = Math.round(
                        (student.math + student.english + student.science + student.filipino) / 4,
                      )
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant={student.math >= 85 ? "default" : "secondary"}>{student.math}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.english >= 85 ? "default" : "secondary"}>{student.english}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.science >= 85 ? "default" : "secondary"}>{student.science}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.filipino >= 85 ? "default" : "secondary"}>{student.filipino}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={average >= 85 ? "default" : "secondary"}>{average}</Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedStudent(student)}
                                  className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white"
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Grades - {student.name}</DialogTitle>
                                  <DialogDescription>Update the student's grades for each subject</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="math">Mathematics</Label>
                                    <Input id="math" type="number" defaultValue={student.math} min="0" max="100" />
                                  </div>
                                  <div>
                                    <Label htmlFor="english">English</Label>
                                    <Input
                                      id="english"
                                      type="number"
                                      defaultValue={student.english}
                                      min="0"
                                      max="100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="science">Science</Label>
                                    <Input
                                      id="science"
                                      type="number"
                                      defaultValue={student.science}
                                      min="0"
                                      max="100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="filipino">Filipino</Label>
                                    <Input
                                      id="filipino"
                                      type="number"
                                      defaultValue={student.filipino}
                                      min="0"
                                      max="100"
                                    />
                                  </div>
                                </div>
                                <Button className="w-full bg-red-800 hover:bg-red-700">
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Changes
                                </Button>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
                <div className="space-y-4">
                  {mockJournalEntries.map((entry) => (
                    <Card key={entry.id} className="border-red-200">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-red-800">{entry.subject}</CardTitle>
                            <CardDescription>
                              {entry.date} - {entry.topic}
                            </CardDescription>
                          </div>
                          <Button size="sm" variant="outline" className="border-red-800 text-red-800">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-red-800">Activities:</h4>
                            <p className="text-gray-600">{entry.activities}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-800">Notes:</h4>
                            <p className="text-gray-600">{entry.notes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
