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
} from "lucide-react"

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [adminData, setAdminData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load admin data from localStorage
    const admin = localStorage.getItem("admin")
    if (admin) {
      setAdminData(JSON.parse(admin))
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    if (confirm("Are you sure you want to log out?")) {
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

  if (!adminData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the Admin Portal</p>
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
                  {adminData?.FirstName} {adminData?.LastName}
                </p>
                <p className="text-sm text-gray-600">{adminData?.Position || "System Administrator"}</p>
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
                  <div className="text-2xl font-bold text-red-800">1,247</div>
                  <p className="text-xs text-gray-600">All grade levels</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Total Teachers</CardTitle>
                  <Shield className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">65</div>
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
                    <Button className="bg-red-800 hover:bg-red-700">Add New Student</Button>
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
                      <TableRow>
                        <TableCell>2024-001234</TableCell>
                        <TableCell>Miguel Torres</TableCell>
                        <TableCell>Grade 10</TableCell>
                        <TableCell>St. Joseph</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-001235</TableCell>
                        <TableCell>Ana Garcia</TableCell>
                        <TableCell>Grade 9</TableCell>
                        <TableCell>St. Mary</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-001236</TableCell>
                        <TableCell>Carlos Mendoza</TableCell>
                        <TableCell>Grade 8</TableCell>
                        <TableCell>St. Peter</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                        </TableCell>
                      </TableRow>
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
