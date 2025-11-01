"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, BookOpen, Award, Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginType, setLoginType] = useState("student")
  const [admissionForm, setAdmissionForm] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    gradeLevel: "",
    previousSchool: "",
    message: "",
  })

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admissionForm),
      })

      const data = await response.json()

      if (data.success) {
        alert("Thank you for your interest! We will contact you soon.")
        // Reset form
        setAdmissionForm({
          studentName: "",
          parentName: "",
          email: "",
          phone: "",
          gradeLevel: "",
          previousSchool: "",
          message: "",
        })
      } else {
        alert(data.error || "There was an error submitting your form. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      // Fallback: save to console for development
      console.log("Admission form submitted:", admissionForm)
      alert("Thank you for your interest! We will contact you soon.")
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const username = formData.get("username") as string | null
    const password = formData.get("password") as string | null

    // Validate inputs
    if (!username || !password) {
      alert("Please enter both username/email and password.")
      return
    }

    try {
      // Convert username to email if needed
      const email = username && username.includes("@") ? username : `${username}@stonino-praga.edu.ph`
      
      // Determine which API endpoint to use based on user type
      let apiEndpoint = ""
      if (loginType === "teacher") {
        apiEndpoint = "/api/teacher/login"
      } else if (loginType === "student") {
        apiEndpoint = "/api/student/login"
      } else if (loginType === "admin") {
        apiEndpoint = "/api/admin/login"
      } else {
        // For guardian, redirect to their page (they can handle their own login)
        if (loginType === "guardian") {
          window.location.href = "/guardian"
        }
        setLoginOpen(false)
        return
      }
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }))
        alert(errorData.error || `Login failed. Please check your credentials.`)
        return
      }

      const data = await response.json()

      if (data.success) {
        // Store user data in localStorage if available
        if (data.teacher) {
          localStorage.setItem("teacher", JSON.stringify(data.teacher))
        } else if (data.student) {
          localStorage.setItem("student", JSON.stringify(data.student))
        } else if (data.admin) {
          localStorage.setItem("admin", JSON.stringify(data.admin))
        }
        
        // Redirect based on user type
        if (loginType === "teacher") {
          window.location.href = "/teacher"
        } else if (loginType === "student") {
          window.location.href = "/student"
        } else if (loginType === "admin") {
          window.location.href = "/admin"
        }
        setLoginOpen(false)
      } else {
        alert(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      // Provide specific error message
      const errorMessage = error?.message || String(error) || ''
      if (errorMessage && (errorMessage.includes('fetch') || errorMessage.includes('network'))) {
        alert("Network error. Please check your internet connection and try again.")
      } else {
        alert(`Login error: ${errorMessage || 'An unexpected error occurred. Please try again.'}`)
      }
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
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-red-800">Sto Niño de Praga Academy</h1>
                <p className="text-sm text-gray-600">Excellence in Education Since 1998</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-red-800 hover:text-red-600 font-medium">
                Home
              </a>
              <a href="#about" className="text-red-800 hover:text-red-600 font-medium">
                About
              </a>
              <a href="#admissions" className="text-red-800 hover:text-red-600 font-medium">
                Admissions
              </a>
              <a href="#contact" className="text-red-800 hover:text-red-600 font-medium">
                Contact
              </a>
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-800 hover:bg-red-700 text-white">Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-red-800">Login to Portal</DialogTitle>
                    <DialogDescription>Choose your login type and enter your credentials</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="loginType">Login As</Label>
                      <Select value={loginType} onValueChange={setLoginType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select login type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="guardian">Guardian (with Student Access)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" type="text" required />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="flex justify-between">
                      <Button type="submit" className="bg-red-800 hover:bg-red-700">
                        Login
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setLoginOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-red-800 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to Excellence</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nurturing young minds with quality education, strong values, and Christian principles since 1998. Join our
            community of learners and achievers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-800 hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" })}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-800 px-8 py-3 bg-transparent"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-red-800 mb-4">Why Choose Our Academy?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive education that develops not just academic excellence, but also character,
              leadership, and spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-red-800 mx-auto mb-4" />
                <CardTitle className="text-red-800">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rigorous curriculum designed to prepare students for higher education and future success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-red-800 mx-auto mb-4" />
                <CardTitle className="text-red-800">Small Class Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Personalized attention with low student-to-teacher ratios for optimal learning.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-red-800 mx-auto mb-4" />
                <CardTitle className="text-red-800">Holistic Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Balanced approach combining academics, arts, sports, and spiritual formation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-12 h-12 text-red-800 mx-auto mb-4" />
                <CardTitle className="text-red-800">Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  25+ years of excellence with graduates succeeding in top universities and careers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-red-800 mb-4">Admissions & Enrollment</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Begin your child's journey to excellence. We welcome students who are eager to learn and grow.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="inquiry" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="inquiry" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
                  Admission Inquiry
                </TabsTrigger>
                <TabsTrigger
                  value="requirements"
                  className="data-[state=active]:bg-red-800 data-[state=active]:text-white"
                >
                  Requirements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inquiry">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">Submit Your Admission Inquiry</CardTitle>
                    <CardDescription>
                      Fill out this form and we'll get back to you with detailed information about our programs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdmissionSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="studentName">Student's Full Name *</Label>
                          <Input
                            id="studentName"
                            value={admissionForm.studentName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                          <Input
                            id="parentName"
                            value={admissionForm.parentName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={admissionForm.email}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={admissionForm.phone}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="gradeLevel">Intended Grade Level *</Label>
                          <Select onValueChange={(value) => setAdmissionForm({ ...admissionForm, gradeLevel: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kindergarten">Kindergarten</SelectItem>
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
                          <Label htmlFor="previousSchool">Previous School</Label>
                          <Input
                            id="previousSchool"
                            value={admissionForm.previousSchool}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, previousSchool: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your child's interests, needs, or any questions you have..."
                          value={admissionForm.message}
                          onChange={(e) => setAdmissionForm({ ...admissionForm, message: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white py-3">
                        Submit Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">Admission Requirements</CardTitle>
                    <CardDescription>Please prepare the following documents for your application.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-red-800 mb-3">For New Students:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Completed application form</li>
                          <li>• Birth certificate (original and photocopy)</li>
                          <li>• Report card from previous school</li>
                          <li>• Certificate of good moral character</li>
                          <li>• Medical certificate</li>
                          <li>• 2x2 ID photos (4 pieces)</li>
                          <li>• Entrance examination (scheduled after application)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-800 mb-3">For Transferees:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• All requirements for new students</li>
                          <li>• Transfer credentials (Form 137)</li>
                          <li>• Certificate of enrollment from previous school</li>
                          <li>• Honorable dismissal</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Important Dates:</h4>
                        <p className="text-gray-600 mb-2">• Application Period: March - May</p>
                        <p className="text-gray-600 mb-2">• Entrance Exam: April - May</p>
                        <p className="text-gray-600">• Enrollment: June</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
            <p className="text-red-100 max-w-2xl mx-auto">
              Have questions? We're here to help. Contact us for more information about our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-red-100">(02) 123-4567</p>
              <p className="text-red-100">0917-123-4567</p>
            </div>

            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-red-100">info@stonino-praga.edu.ph</p>
              <p className="text-red-100">admissions@stonino-praga.edu.ph</p>
            </div>

            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-red-100">123 Education Street</p>
              <p className="text-red-100">Manila, Philippines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Sto Niño de Praga Academy Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h5 className="font-semibold">Sto Niño de Praga Academy</h5>
                <p className="text-sm text-gray-400">Excellence in Education Since 1998</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">© 2024 Sto Niño de Praga Academy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
