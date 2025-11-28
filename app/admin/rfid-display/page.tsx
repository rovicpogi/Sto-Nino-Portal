"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, RefreshCcw, X, LogIn, LogOut, User } from "lucide-react"

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  gradeLevel: string
  section: string
  scanTime: string
  status: string
  rfidCard: string
  studentPhoto?: string
  scanType?: 'timein' | 'timeout' | null
  timeIn?: string | null
  timeOut?: string | null
  // Teacher fields
  isTeacher?: boolean
  subject?: string
  role?: string
}

type FilterType = "all" | "timein" | "timeout"

export default function RfidDisplayPage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [loadingAttendance, setLoadingAttendance] = useState(false)
  const [lastScanTime, setLastScanTime] = useState<string | null>(null)
  const [flashingRecord, setFlashingRecord] = useState<AttendanceRecord | null>(null)
  const [showFlash, setShowFlash] = useState(false)
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [currentTime, setCurrentTime] = useState<string>("")

  const fetchLiveAttendance = useCallback(async (onlyNew = false) => {
    setLoadingAttendance(true)
    try {
      const url = onlyNew && lastScanTime
        ? `/api/admin/attendance-live?since=${lastScanTime}&limit=50`
        : `/api/admin/attendance-live?limit=50`
      
      const response = await fetch(url)
      
      // Check if response is OK
      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response:', errorText)
        return
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', contentType)
        const text = await response.text()
        console.error('Response text:', text.substring(0, 200))
        return
      }
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (result.success && result.records) {
        console.log('✅ Fetched records:', result.records.length, result.records)
        if (onlyNew && result.records.length > 0) {
          // Prepend new records to the beginning
          setAttendanceRecords((prev) => {
            const newRecords = result.records.filter(
              (newRec: AttendanceRecord) => !prev.some((p) => p.id === newRec.id)
            )
            const updated = [...newRecords, ...prev].slice(0, 50)
            console.log('Updated records:', updated.length, 'New:', newRecords.length)
            
            // Flash the newest record for 2 seconds
            if (newRecords.length > 0) {
              setFlashingRecord(newRecords[0])
              setShowFlash(true)
              
              // Hide after 2 seconds
              setTimeout(() => {
                setShowFlash(false)
                setTimeout(() => {
                  setFlashingRecord(null)
                }, 300) // Wait for fade out animation
              }, 2000)
            }
            
            return updated
          })
          // Update last scan time
          if (result.records[0]) {
            setLastScanTime(result.records[0].scanTime)
          }
        } else {
          // Initial load
          console.log('✅ Initial load - setting records:', result.records.length)
          setAttendanceRecords(result.records)
          if (result.records.length > 0) {
            setLastScanTime(result.records[0].scanTime)
            console.log('✅ Latest record:', result.records[0])
            console.log('✅ Display should show:', {
              name: result.records[0].studentName,
              grade: result.records[0].gradeLevel,
              section: result.records[0].section,
              isTeacher: result.records[0].isTeacher,
              subject: result.records[0].subject
            })
          } else {
            console.log('⚠️ No records in initial load')
          }
        }
      } else {
        console.log('❌ No records in response:', result)
        console.log('Response success:', result.success)
        console.log('Response records:', result.records)
      }
    } catch (error) {
      console.error("Error fetching live attendance:", error)
    } finally {
      setLoadingAttendance(false)
    }
  }, [lastScanTime])

  // Initial load
  useEffect(() => {
    console.log('🔄 Component mounted - fetching initial data...')
    fetchLiveAttendance(false)
  }, [fetchLiveAttendance])

  // Debug: Log when records change
  useEffect(() => {
    console.log('📊 Attendance records updated:', attendanceRecords.length)
    if (attendanceRecords.length > 0) {
      console.log('📊 First record:', attendanceRecords[0])
    }
  }, [attendanceRecords])

  // Poll for new records every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveAttendance(true)
    }, 2000)
    return () => clearInterval(interval)
  }, [fetchLiveAttendance])

  // Update current time on client side only
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Filter records based on selected filter type using database scanType field
  const filteredRecords = useMemo(() => {
    if (filterType === "all") {
      return attendanceRecords
    }
    return attendanceRecords.filter((record) => {
      // Use scanType from database, not calculated from history
      return record.scanType === filterType
    })
  }, [attendanceRecords, filterType])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-3xl font-bold">RFID Scan Display</h1>
              <p className="text-gray-400">Live attendance monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Time In/Out Toggle */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
              <Button
                variant={filterType === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("all")}
                className={`${
                  filterType === "all"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                All
              </Button>
              <Button
                variant={filterType === "timein" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("timein")}
                className={`${
                  filterType === "timein"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <LogIn className="w-4 h-4 mr-1" />
                Time In
              </Button>
              <Button
                variant={filterType === "timeout" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("timeout")}
                className={`${
                  filterType === "timeout"
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Time Out
              </Button>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Last Updated</div>
              <div className="text-lg font-semibold" suppressHydrationWarning>
                {currentTime || "--:--:--"}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchLiveAttendance(false)}
              disabled={loadingAttendance}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${loadingAttendance ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Latest Scan Display - Large Prominent Display */}
        {attendanceRecords.length > 0 ? (
          <Card className="mb-6 border-4 border-red-500 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-8">
                {/* Photo */}
                <div className="flex-shrink-0">
                  {attendanceRecords[0]?.studentPhoto ? (
                    <Image
                      src={attendanceRecords[0].studentPhoto}
                      alt={attendanceRecords[0]?.studentName || "Student"}
                      width={200}
                      height={200}
                      className="rounded-full border-4 border-red-500 shadow-2xl object-cover"
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] rounded-full border-4 border-red-500 bg-gray-700 flex items-center justify-center shadow-2xl">
                      <User className="w-24 h-24 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Information */}
                <div className="flex-1 text-center">
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Name</div>
                    <div className="text-5xl font-bold text-white mb-4">{attendanceRecords[0]?.studentName || "Unknown"}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* For Students: Grade & Section */}
                    {!attendanceRecords[0]?.isTeacher && (
                      <>
                        <div>
                          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Grade Level</div>
                          <div className="text-3xl font-bold text-white">{attendanceRecords[0]?.gradeLevel || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Section</div>
                          <div className="text-3xl font-bold text-white">{attendanceRecords[0]?.section || "N/A"}</div>
                        </div>
                      </>
                    )}
                    
                    {/* For Teachers: Subject */}
                    {attendanceRecords[0]?.isTeacher && (
                      <div className="col-span-2">
                        <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Subject</div>
                        <div className="text-3xl font-bold text-white">{attendanceRecords[0]?.subject || "N/A"}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Date</div>
                      <div className="text-2xl font-bold text-white">{attendanceRecords[0]?.scanTime ? formatDate(attendanceRecords[0].scanTime) : "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Time</div>
                      <div className="text-2xl font-bold text-white">{attendanceRecords[0]?.scanTime ? formatTime(attendanceRecords[0].scanTime) : "N/A"}</div>
                    </div>
                  </div>
                  
                  {/* Scan Type Badge */}
                  <div className="mt-6">
                    <Badge
                      className={
                        attendanceRecords[0]?.scanType === "timein"
                          ? "bg-green-600 text-white text-xl px-6 py-2"
                          : attendanceRecords[0]?.scanType === "timeout"
                          ? "bg-orange-600 text-white text-xl px-6 py-2"
                          : "bg-gray-600 text-white text-xl px-6 py-2"
                      }
                    >
                      {attendanceRecords[0]?.scanType === "timein" ? "TIME IN" : 
                       attendanceRecords[0]?.scanType === "timeout" ? "TIME OUT" : 
                       "SCAN RECORDED"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* No Scans Message */}
        {attendanceRecords.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-20">
              <div className="text-center text-gray-400">
                <Radio className="w-24 h-24 mx-auto mb-6 opacity-50" />
                <p className="text-2xl">No scans yet. Waiting for RFID card scans...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Scans List - Only show if there are multiple scans */}
        {attendanceRecords.length > 1 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Recent Scans ({filteredRecords.length - 1}
                {filterType !== "all" && ` of ${attendanceRecords.length - 1} total`})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredRecords.slice(1).length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>
                    {`No ${filterType === "timein" ? "time in" : "time out"} scans found.`}
                  </p>
                </div>
              ) : (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {filteredRecords.slice(1).map((record, index) => {
                  const recordDate = formatDate(record.scanTime)
                  const prevDate = index > 0 ? formatDate(filteredRecords[index + 1].scanTime) : null
                  const showDateSeparator = recordDate !== prevDate

                  return (
                    <div key={record.id}>
                      {showDateSeparator && (
                        <div className="text-center text-gray-500 text-sm font-semibold py-2 border-b border-gray-700 my-2">
                          {recordDate}
                        </div>
                      )}
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-700/50 border-gray-600 hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Photo */}
                          <div className="flex-shrink-0">
                            {record.studentPhoto ? (
                              <Image
                                src={record.studentPhoto}
                                alt={record.studentName}
                                width={60}
                                height={60}
                                className="rounded-full border-2 border-gray-600 object-cover"
                              />
                            ) : (
                              <div className="w-15 h-15 rounded-full border-2 border-gray-600 bg-gray-700 flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          {/* Date and Time */}
                          <div className="text-left w-32">
                            <div className="text-sm text-gray-400 mb-1">Date</div>
                            <div className="text-sm font-semibold text-white">{formatDate(record.scanTime)}</div>
                            <div className="text-lg font-mono text-gray-300 mt-1">{formatTime(record.scanTime)}</div>
                          </div>
                          {/* Name and Info */}
                          <div className="flex-1">
                            <div className="text-xl font-bold text-white mb-1">{record.studentName}</div>
                            <div className="text-sm text-gray-400">
                              {record.isTeacher 
                                ? `Subject: ${record.subject || "N/A"}`
                                : `${record.gradeLevel || "N/A"} - ${record.section || "N/A"} | ID: ${record.studentId || "N/A"}`
                              }
                            </div>
                          </div>
                          {/* Scan Type */}
                          <div>
                            <Badge
                              className={
                                record.scanType === "timein"
                                  ? "bg-green-600 text-white"
                                  : record.scanType === "timeout"
                                  ? "bg-orange-600 text-white"
                                  : "bg-gray-600 text-white"
                              }
                            >
                              {record.scanType === "timein" ? "TIME IN" : 
                               record.scanType === "timeout" ? "TIME OUT" : 
                               "SCAN"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  )
}


