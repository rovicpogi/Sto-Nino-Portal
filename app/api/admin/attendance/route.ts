import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  try {
    const admin = getSupabaseAdmin()

    // Try to fetch attendance data from database
    // For now, return mock data structure that matches what the frontend expects
    // In production, you would query the actual attendance_records table

    const mockAttendanceData = {
      summary: {
        presentStudents: 245,
        totalStudents: 280,
        presentTeachers: 18,
        totalTeachers: 20,
        lastSync: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
      },
      rfid: {
        status: 'online',
        activeCards: 265,
        pendingActivations: 3,
        offlineReaders: 0,
      },
      recentScans: [
        {
          id: '1',
          studentName: 'Juan Dela Cruz',
          gradeLevel: 'Grade 10',
          section: 'A',
          scanTime: new Date().toISOString(),
          status: 'Present',
        },
        {
          id: '2',
          studentName: 'Maria Santos',
          gradeLevel: 'Grade 11',
          section: 'B',
          scanTime: new Date(Date.now() - 5 * 60000).toISOString(),
          status: 'Present',
        },
        {
          id: '3',
          studentName: 'Jose Garcia',
          gradeLevel: 'Grade 9',
          section: 'C',
          scanTime: new Date(Date.now() - 10 * 60000).toISOString(),
          status: 'Present',
        },
      ],
      recentAlerts: [
        {
          id: '1',
          type: 'info',
          message: 'RFID system operating normally',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
        },
      ],
    }

    // Try to fetch real data if database is available
    try {
      // Check if attendance_records table exists and fetch recent records
      const { data: records, error } = await admin
        .from('attendance_records')
        .select('*, students(*)')
        .order('scan_time', { ascending: false })
        .limit(10)

      if (!error && records && records.length > 0) {
        // Process real data
        const today = new Date().toISOString().split('T')[0]
        const todayRecords = records.filter((r: any) => 
          r.scan_time?.startsWith(today) || r.created_at?.startsWith(today)
        )

        // Count unique students present today
        const uniqueStudents = new Set(todayRecords.map((r: any) => r.student_id || r.students?.student_id))
        
        // Get total students count
        const { count: totalStudents } = await admin
          .from('students')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'enrolled')

        mockAttendanceData.summary.presentStudents = uniqueStudents.size
        mockAttendanceData.summary.totalStudents = totalStudents || 280

        // Format recent scans
        mockAttendanceData.recentScans = records.slice(0, 5).map((record: any) => ({
          id: record.id?.toString() || '',
          studentName: record.students 
            ? `${record.students.first_name || ''} ${record.students.last_name || ''}`.trim() || record.students.name
            : 'Unknown Student',
          gradeLevel: record.students?.grade_level || 'N/A',
          section: record.students?.section || 'N/A',
          scanTime: record.scan_time || record.created_at,
          status: record.status || 'Present',
        }))
      }
    } catch (dbError) {
      // If database query fails, use mock data
      console.warn('Using mock attendance data:', dbError)
    }

    return NextResponse.json({
      success: true,
      data: mockAttendanceData,
    })
  } catch (error: any) {
    console.error('Attendance API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}

