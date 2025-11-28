"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
  Eye,
  EyeOff,
  RefreshCcw,
  AlertCircle,
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
  gpa?: number
  attendance_rate?: number
  active_courses?: number
  pending_tasks?: number
  [key: string]: any
}

type NullableNumber = number | null

interface DashboardStats {
  gpa: NullableNumber
  attendanceRate: NullableNumber
  activeCourses: NullableNumber
  pendingTasks: NullableNumber
}

interface AssignmentSummary {
  id: string
  title: string
  subject: string
  dueDate: string
  status: string
}

interface CourseProgress {
  id: string
  subject: string
  completion: number
  instructor?: string | null
}

interface ScheduleItem {
  id: string
  subject: string
  time: string
  location: string
  instructor?: string | null
  accent?: string
}

interface EventItem {
  id: string
  title: string
  date: string
  description?: string
  accent?: string
}

interface GradeItem {
  id: string
  subject: string
  grade: string
  lastUpdated: string
}

interface DashboardData {
  stats: DashboardStats
  assignments: AssignmentSummary[]
  courseProgress: CourseProgress[]
  schedule: {
    today: ScheduleItem[]
    events: EventItem[]
  }
  grades: GradeItem[]
  enrollment: {
    status: string
    academicYear: string
  }
}

const STORAGE_KEY = "student"
const VIEW_QUERY = "view"
const DEFAULT_VIEW = "dashboard"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "enrollment", label: "Enrollment", icon: FileText },
  { id: "schedule", label: "Schedule Calendar", icon: Calendar },
  { id: "grades", label: "Grades & Reports", icon: GraduationCap },
  { id: "profile", label: "Profile", icon: User },
] as const

type NavItem = (typeof NAV_ITEMS)[number]["id"]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const accentStyles: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  green: "bg-green-50 border-green-200 text-green-800",
  purple: "bg-purple-50 border-purple-200 text-purple-800",
  orange: "bg-orange-50 border-orange-200 text-orange-800",
  red: "bg-red-50 border-red-200 text-red-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
}

const formatDate = (isoDate: string) => {
  if (!isoDate) return "TBD"
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

const normalizePercentage = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  return value > 1 ? Math.min(value, 100) : Math.min(Math.max(value * 100, 0), 100)
}

export default function StudentDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [activeNav, setActiveNav] = useState<NavItem>(DEFAULT_VIEW)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState<string | null>(null)

  const emailErrorMessage = useMemo(() => {
    if (!loginEmail) return null
    return EMAIL_REGEX.test(loginEmail.trim()) ? null : "Enter a valid email address."
  }, [loginEmail])

  const passwordErrorMessage = useMemo(() => {
    if (!loginPassword) return null
    return loginPassword.length >= 6 ? null : "Password must be at least 6 characters."
  }, [loginPassword])

  const computedStats = useMemo<DashboardStats>(
    () => ({
      gpa: dashboardData?.stats?.gpa ?? student?.gpa ?? null,
      attendanceRate:
        dashboardData?.stats?.attendanceRate ?? normalizePercentage(student?.attendance_rate ?? null),
      activeCourses: dashboardData?.stats?.activeCourses ?? student?.active_courses ?? null,
      pendingTasks: dashboardData?.stats?.pendingTasks ?? student?.pending_tasks ?? null,
    }),
    [dashboardData, student],
  )

  const persistStudentSession = useCallback((payload: Student, persist: boolean) => {
    if (typeof window === "undefined") return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    if (persist) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const clearStudentSession = useCallback(() => {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const restoreStudentFromStorage = useCallback(() => {
    if (typeof window === "undefined") return
    const fromSession = sessionStorage.getItem(STORAGE_KEY)
    const fromLocal = localStorage.getItem(STORAGE_KEY)
    const rawStudent = fromSession ?? fromLocal

    if (rawStudent) {
      try {
        const parsed = JSON.parse(rawStudent)
        setStudent(parsed)
        setRememberMe(Boolean(fromLocal))
      } catch (error) {
        console.error("Error parsing stored student data:", error)
        clearStudentSession()
      }
    }
    setIsLoading(false)
  }, [clearStudentSession])

  useEffect(() => {
    restoreStudentFromStorage()
  }, [restoreStudentFromStorage])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && !event.newValue) {
        setStudent(null)
        setDashboardData(null)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const updateViewQuery = useCallback(
    (view: NavItem) => {
      if (typeof window === "undefined") return
      const params = new URLSearchParams(window.location.search)
      params.set(VIEW_QUERY, view)
      const queryString = params.toString()
      router.replace(`${window.location.pathname}?${queryString}`, { scroll: false })
    },
    [router],
  )

  useEffect(() => {
    const paramView = searchParams?.get(VIEW_QUERY) as NavItem | null
    if (paramView && paramView !== activeNav) {
      setActiveNav(paramView)
    } else if (!paramView) {
      updateViewQuery(activeNav)
    }
  }, [searchParams, activeNav, updateViewQuery])

  const fetchDashboardData = useCallback(async (currentStudent: Student) => {
    setDashboardLoading(true)
    setDashboardError(null)
    try {
      const response = await fetch("/api/student/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: currentStudent.id, email: currentStudent.email }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload?.success) {
        setDashboardData(payload?.data ?? null)
        throw new Error(payload?.error || `Unable to load dashboard data (${response.status}).`)
      }

      setDashboardData(payload.data)
    } catch (error: any) {
      console.error("Dashboard data error:", error)
      setDashboardError(error?.message || "Unable to load dashboard data.")
      setDashboardData((prev) => prev ?? null)
    } finally {
      setDashboardLoading(false)
    }
  }, [])

  useEffect(() => {
    if (student) {
      fetchDashboardData(student)
    } else {
      setDashboardData(null)
    }
  }, [student, fetchDashboardData])

  const handleRefreshDashboard = useCallback(() => {
    if (student) {
      fetchDashboardData(student)
    }
  }, [student, fetchDashboardData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)

    if (emailErrorMessage || passwordErrorMessage) {
      setLoginError("Please fix the highlighted fields before continuing.")
      return
    }

    setIsLoggingIn(true)
    setLoginError(null)

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Network error occurred" }))
        setLoginError(errorData.error || `Server error (${response.status}). Please try again.`)
        return
      }

      const data = await response.json()

      if (data.success && data.student) {
        setStudent(data.student)
        persistStudentSession(data.student, rememberMe)
        setLoginEmail("")
        setLoginPassword("")
        setEmailTouched(false)
        setPasswordTouched(false)
        setLoginError(null)
      } else {
        setLoginError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      const errorMessage = error?.message || String(error) || ""
      if (errorMessage?.toLowerCase().includes("network")) {
        setLoginError("Network error. Please check your internet connection and try again.")
      } else if (errorMessage?.includes("Failed to fetch")) {
        setLoginError("Cannot connect to the server. Please make sure the server is running.")
      } else {
        setLoginError(`An error occurred: ${errorMessage || "Please try again."}`)
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      clearStudentSession()
      setStudent(null)
      setDashboardData(null)
      router.replace("/")
    }
  }

  const loginDisabled =
    isLoggingIn || !loginEmail || !loginPassword || Boolean(emailErrorMessage || passwordErrorMessage)

  const displayName = useMemo(() => {
    if (!student) return "Student"
    if (student.name) return student.name
    if (student.first_name && student.last_name) {
      return `${student.first_name} ${student.last_name}`
    }
    return student.email
  }, [student])

  const studentInitials = useMemo(() => {
    if (!student) return "S"
    if (student.name) {
      return student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (student.first_name && student.last_name) {
      return `${student.first_name[0]}${student.last_name[0]}`.toUpperCase()
    }
    return student.email?.[0]?.toUpperCase() ?? "S"
  }, [student])

  const assignments = dashboardData?.assignments ?? []
  const courseProgress = dashboardData?.courseProgress ?? []
  const scheduleToday = dashboardData?.schedule?.today ?? []
  const upcomingEvents = dashboardData?.schedule?.events ?? []
  const gradeItems = dashboardData?.grades ?? []
  const enrollmentInfo = dashboardData?.enrollment

  const statCards = [
    {
      label: "Current GPA",
      value: computedStats.gpa !== null ? computedStats.gpa.toFixed(2) : "—",
      helper: computedStats.gpa !== null ? "Registrar confirmed" : "Awaiting registrar data",
    },
    {
      label: "Attendance Rate",
      value: computedStats.attendanceRate !== null ? `${computedStats.attendanceRate.toFixed(0)}%` : "—",
      helper:
        computedStats.attendanceRate !== null ? "Last 30 days" : "Attendance data will appear once available",
    },
    {
      label: "Active Courses",
      value: computedStats.activeCourses !== null ? String(computedStats.activeCourses) : "—",
      helper: computedStats.activeCourses !== null ? "Enrolled this term" : "Courses will load shortly",
    },
    {
      label: "Pending Tasks",
      value: computedStats.pendingTasks !== null ? String(computedStats.pendingTasks) : "—",
      helper: computedStats.pendingTasks !== null ? "Due this week" : "Tasks will sync from LMS",
    },
  ]

  const handleNavChange = (view: NavItem) => {
    setActiveNav(view)
    updateViewQuery(view)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">Loading...</div>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
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
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={emailTouched && Boolean(emailErrorMessage)}
                  aria-describedby="login-email-error"
                  autoComplete="email"
                  required
                  className="border-gray-200"
                />
                {emailTouched && emailErrorMessage && (
                  <p id="login-email-error" className="text-sm text-red-600">
                    {emailErrorMessage}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    aria-invalid={passwordTouched && Boolean(passwordErrorMessage)}
                    aria-describedby="login-password-error"
                    autoComplete="current-password"
                    required
                    className="border-gray-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordTouched && passwordErrorMessage && (
                  <p id="login-password-error" className="text-sm text-red-600">
                    {passwordErrorMessage}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-700 focus:ring-red-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me on this device</span>
                </label>
                <Link href="/" className="text-sm text-red-700 hover:underline">
                  Need help?
                </Link>
              </div>
              {loginError && (
                <div
                  className="flex items-start space-x-2 text-red-700 text-sm bg-red-50 p-3 rounded"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p aria-live="assertive">{loginError}</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={loginDisabled}
                className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-60"
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
      <header className="bg-white shadow-sm border-b" role="banner">
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
            <div className="relative" role="search">
              <label htmlFor="student-portal-search" className="sr-only">
                Search
              </label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden />
              <input
                id="student-portal-search"
                type="text"
                placeholder="Search"
                aria-label="Search portal content"
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {studentInitials}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{displayName}</p>
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

      <div className="flex" role="presentation">
        <aside className="w-64 bg-white min-h-screen border-r border-gray-200" aria-label="Sidebar navigation">
          <nav className="mt-6" role="navigation" aria-label="Student sections">
            <div className="px-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavChange(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-left text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isActive ? "bg-red-50 text-red-700 border-r-2 border-red-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 mr-3" aria-hidden />
                    {item.label}
                  </button>
                )
              })}
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

        <main className="flex-1 p-6" role="main">
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {displayName}!</h2>
                  <p className="text-gray-600">Here&apos;s your academic overview for today.</p>
                </div>
                <div className="flex items-center gap-2">
                  {dashboardError && (
                    <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
                      Sync issue
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefreshDashboard}
                    disabled={dashboardLoading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCcw className={`w-4 h-4 ${dashboardLoading ? "animate-spin" : ""}`} />
                    Refresh data
                  </Button>
                </div>
              </div>

              {dashboardError && (
                <div className="flex items-start space-x-3 bg-red-50 border border-red-100 text-sm text-red-800 p-4 rounded-md">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-semibold">We couldn&apos;t refresh your dashboard.</p>
                    <p>{dashboardError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                  <Card key={stat.label} className="bg-white border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {stat.label}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <ChevronRight className="w-3 h-3 mr-1" />
                        {stat.helper}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recent Assignments</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Your latest assignments and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {assignments.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden />
                        <p className="text-gray-600">
                          {dashboardLoading ? "Loading assignments..." : "No assignments available."}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Assignments will load automatically once published.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {assignments.map((assignment) => (
                          <div
                            key={assignment.id}
                            className="flex items-center justify-between border border-gray-100 rounded-lg p-3"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{assignment.title}</p>
                              <p className="text-sm text-gray-500">
                                {assignment.subject} · Due {formatDate(assignment.dueDate)}
                              </p>
                            </div>
                            <Badge
                              className={`${
                                assignment.status === "completed"
                                  ? "bg-green-50 text-green-700"
                                  : assignment.status === "overdue"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              {assignment.status.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Course Progress</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Your progress in current subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {courseProgress.length === 0 ? (
                      <div className="text-center py-12">
                        <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden />
                        <p className="text-gray-600">
                          {dashboardLoading ? "Syncing progress..." : "No course progress data available."}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Course progress will be loaded from the database.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {courseProgress.map((course) => (
                          <div key={course.id}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <p className="font-medium text-gray-900">{course.subject}</p>
                              <span className="text-gray-600">{course.completion}%</span>
                            </div>
                            {course.instructor && (
                              <p className="text-xs text-gray-500 mb-2">Instructor: {course.instructor}</p>
                            )}
                            <Progress value={course.completion} className="h-2" />
                          </div>
                        ))}
                      </div>
                    )}
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
                          {enrollmentInfo?.status ||
                            (student.grade_level
                              ? `Currently enrolled - ${student.grade_level}`
                              : "Enrollment status will be loaded from the database")}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800">Academic Year</h4>
                      <p className="text-sm text-gray-600">
                        {enrollmentInfo?.academicYear || "Academic year information will be loaded from the database."}
                      </p>
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
                      <h4 className="font-medium mb-4 text-red-800">Today&apos;s Classes</h4>
                      <div className="space-y-3">
                        {scheduleToday.length === 0 ? (
                          <p className="text-sm text-gray-600">Schedule will be available soon.</p>
                        ) : (
                          scheduleToday.map((item) => (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                accentStyles[item.accent ?? "blue"] ?? accentStyles.blue
                              }`}
                            >
                              <div>
                                <h5 className="font-medium">{item.subject}</h5>
                                <p className="text-sm opacity-90">
                                  {item.location}
                                  {item.instructor ? ` - ${item.instructor}` : ""}
                                </p>
                              </div>
                              <span className="text-sm font-medium">{item.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4 text-red-800">Upcoming Events</h4>
                      <div className="space-y-3">
                        {upcomingEvents.length === 0 ? (
                          <p className="text-sm text-gray-600">No upcoming events posted.</p>
                        ) : (
                          upcomingEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`p-3 rounded-lg border ${
                                accentStyles[event.accent ?? "orange"] ?? accentStyles.orange
                              }`}
                            >
                              <h5 className="font-medium">{event.title}</h5>
                              <p className="text-sm opacity-90">{formatDate(event.date)}</p>
                              {event.description && <p className="text-xs opacity-80 mt-1">{event.description}</p>}
                            </div>
                          ))
                        )}
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
                  {gradeItems.length === 0 ? (
                    <div className="text-center py-12">
                      <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden />
                      <p className="text-gray-600">
                        {dashboardLoading ? "Fetching grades..." : "No grades available."}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Grades will be loaded from the database.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {gradeItems.map((grade) => (
                        <div
                          key={grade.id}
                          className="flex items-center justify-between border border-gray-100 rounded-lg p-4"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{grade.subject}</p>
                            <p className="text-sm text-gray-500">Updated {formatDate(grade.lastUpdated)}</p>
                          </div>
                          <div className="text-xl font-semibold text-gray-900">{grade.grade}</div>
                        </div>
                      ))}
                    </div>
                  )}
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
                      <p className="text-gray-900">{displayName}</p>
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
                        <Mail className="w-4 h-4 mr-1" aria-hidden />
                        Email
                      </label>
                      <p className="text-gray-900 break-words">{student.email}</p>
                    </div>
                    {(student.phone || student.contact_number) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <p className="text-gray-900">{student.phone || student.contact_number}</p>
                      </div>
                    )}
                    {student.address && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <p className="text-gray-900">{student.address}</p>
                      </div>
                    )}
                    {Object.entries(student)
                      .filter(([key]) =>
                        [
                          "id",
                          "email",
                          "Password",
                          "password",
                          "name",
                          "first_name",
                          "last_name",
                          "student_id",
                          "grade_level",
                          "section",
                          "phone",
                          "contact_number",
                          "address",
                          "gpa",
                          "attendance_rate",
                          "active_courses",
                          "pending_tasks",
                        ].every((reserved) => reserved !== key),
                      )
                      .map(([key, value]) => (
                        value && (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                              {key.replace(/_/g, " ")}
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
