import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// Enable CORS for ESP32 requests
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const since = searchParams.get('since') // Optional: get records since this timestamp

    // Fetch recent attendance records
    // Join with students table to get student information
    let query = supabase
      .from('attendance_records')
      .select(`
        *,
        students (
          student_id,
          first_name,
          last_name,
          grade_level,
          section,
          photo_url,
          profile_picture,
          picture
        )
      `)
      .order('scan_time', { ascending: false })
      .limit(limit)

    // If 'since' parameter is provided, filter records after that time
    if (since) {
      query = query.gt('scan_time', since)
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch attendance records',
        records: [],
      }, { status: 500 })
    }

    // Format the response
    const formattedRecords = (data || []).map((record: any) => {
      // Determine scan type from database fields
      // Check for time_in, time_out, scan_type, or type fields
      let scanType: 'timein' | 'timeout' | null = null
      
      if (record.time_in && record.scan_time === record.time_in) {
        scanType = 'timein'
      } else if (record.time_out && record.scan_time === record.time_out) {
        scanType = 'timeout'
      } else if (record.scan_type) {
        scanType = record.scan_type.toLowerCase() === 'time_in' || record.scan_type.toLowerCase() === 'timein' ? 'timein' : 
                   record.scan_type.toLowerCase() === 'time_out' || record.scan_type.toLowerCase() === 'timeout' ? 'timeout' : null
      } else if (record.type) {
        scanType = record.type.toLowerCase() === 'time_in' || record.type.toLowerCase() === 'timein' ? 'timein' : 
                   record.type.toLowerCase() === 'time_out' || record.type.toLowerCase() === 'timeout' ? 'timeout' : null
      }
      
      return {
        id: record.id,
        studentId: record.student_id || record.students?.student_id,
        studentName: record.students 
          ? `${record.students.first_name || ''} ${record.students.last_name || ''}`.trim()
          : 'Unknown Student',
        gradeLevel: record.students?.grade_level || 'N/A',
        section: record.students?.section || 'N/A',
        scanTime: record.scan_time || record.created_at,
        status: record.status || 'Present',
        rfidCard: record.rfid_card || 'N/A',
        studentPhoto: record.students?.photo_url || record.students?.profile_picture || record.students?.picture || null,
        scanType: scanType, // Include scan type from database
        timeIn: record.time_in || null,
        timeOut: record.time_out || null,
      }
    })

    return NextResponse.json({
      success: true,
      records: formattedRecords,
      count: formattedRecords.length,
    })
  } catch (error: any) {
    console.error('Attendance records API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        records: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Handle CORS preflight
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const scanData = await request.json()
    
    // Validate required fields
    if (!scanData.studentId && !scanData.rfidCard) {
      return NextResponse.json(
        { success: false, error: 'Student ID or RFID Card is required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }

    const supabaseClient = supabase

    if (!supabaseClient) {
      console.error('Supabase client not initialized')
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Scan recorded (dev mode - not saved to database)',
        })
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database service not configured. Please check your environment variables.' 
        },
        { status: 500 }
      )
    }

    // Get current date (start of day) for checking existing records
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.toISOString()
    const todayEnd = new Date(today)
    todayEnd.setHours(23, 59, 59, 999)
    const todayEndISO = todayEnd.toISOString()

    // Find student by RFID card or student ID
    let studentId = scanData.studentId
    if (!studentId && scanData.rfidCard) {
      // Normalize RFID card - remove spaces, convert to uppercase, remove leading zeros
      let rfidNormalized = scanData.rfidCard.toString().trim().toUpperCase().replace(/\s+/g, '')
      // Also create version without leading zeros for matching
      const rfidNoLeadingZeros = rfidNormalized.replace(/^0+/, '')
      
      console.log(`Searching for student with RFID: ${rfidNormalized} (also trying: ${rfidNoLeadingZeros})`)
      
      // Fetch all students and filter in memory to avoid column errors
      const { data: allStudents, error: fetchError } = await supabaseClient
        .from('students')
        .select('*')
        .limit(1000)

      if (fetchError) {
        console.error('Error fetching students:', fetchError)
        return NextResponse.json(
          { 
            success: false, 
            error: `Database error: ${fetchError.message}`,
            searchedRfid: rfidNormalized
          },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          }
        )
      }

      // Filter students in memory by RFID (check all possible column names)
      // Priority: rfid_card (what ESP32 expects) > rfidCard > rfid_tag > rfidTag
      const students = (allStudents || []).filter((student: any) => {
        const rfid1 = (student.rfid_card || '').toString().trim().toUpperCase()  // Primary - ESP32 expects this
        const rfid2 = (student.rfidCard || '').toString().trim().toUpperCase()
        const rfid3 = (student.rfid_tag || '').toString().trim().toUpperCase()
        const rfid4 = (student.rfidTag || '').toString().trim().toUpperCase()
        
        // Check exact matches first, then partial
        return rfid1 === rfidNormalized || rfid1 === rfidNoLeadingZeros ||
               rfid2 === rfidNormalized || rfid2 === rfidNoLeadingZeros ||
               rfid3 === rfidNormalized || rfid3 === rfidNoLeadingZeros ||
               rfid4 === rfidNormalized || rfid4 === rfidNoLeadingZeros ||
               rfid1.includes(rfidNormalized) || rfid2.includes(rfidNormalized) ||
               rfid3.includes(rfidNormalized) || rfid4.includes(rfidNormalized)
      })

      if (!students || students.length === 0) {
        console.log(`No student found with RFID: ${rfidNormalized}`)
        
        return NextResponse.json(
          { 
            success: false, 
            error: `Student not found for RFID: ${rfidNormalized}. Please assign this RFID card to a student in the admin panel.`,
            searchedRfid: rfidNormalized,
            message: `RFID ${rfidNormalized} not assigned to any student`
          },
          { 
            status: 404,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          }
        )
      }
      
      // Use first match
      const matchedStudent = students[0]
      
      console.log(`Found student: ${matchedStudent.first_name || matchedStudent.firstName || 'Unknown'} ${matchedStudent.last_name || matchedStudent.lastName || ''}`)
      
      // Get student_id or student_number
      studentId = matchedStudent.student_id || matchedStudent.student_number || matchedStudent.id || matchedStudent.studentId
    }

    // Check if student has already scanned in today
    const { data: todayRecords, error: checkError } = await supabaseClient
      .from('attendance_records')
      .select('id, scan_type, scan_time, time_in, time_out')
      .eq('student_id', studentId)
      .gte('scan_time', todayStart)
      .lte('scan_time', todayEndISO)
      .order('scan_time', { ascending: true })

    if (checkError) {
      console.error('Error checking existing records:', checkError)
    }

    // Determine scan type
    let scanType: 'timein' | 'timeout' = 'timein'
    let timeIn = null
    let timeOut = null
    const currentTime = new Date().toISOString()

    if (todayRecords && todayRecords.length > 0) {
      // Check if there's already a time in for today
      const hasTimeIn = todayRecords.some((r: any) => 
        r.scan_type === 'timein' || r.scan_type === 'time_in' || 
        (r.time_in && r.scan_time === r.time_in)
      )
      
      if (hasTimeIn) {
        // This is a time out
        scanType = 'timeout'
        timeOut = currentTime
        // Find the time in record
        const timeInRecord = todayRecords.find((r: any) => 
          r.scan_type === 'timein' || r.scan_type === 'time_in' || 
          (r.time_in && r.scan_time === r.time_in)
        )
        if (timeInRecord) {
          timeIn = timeInRecord.time_in || timeInRecord.scan_time
        }
      } else {
        // This is a time in
        scanType = 'timein'
        timeIn = currentTime
      }
    } else {
      // No records today, this is a time in
      scanType = 'timein'
      timeIn = currentTime
    }

    // Insert the attendance record
    // Build insert object with only fields that might exist
    const attendanceRecord: any = {
      student_id: studentId,
      scan_time: currentTime,
      scan_type: scanType,
      time_in: timeIn,
      time_out: timeOut,
      status: scanType === 'timein' ? 'Present' : 'Present',
      created_at: currentTime,
    }
    
    // Only add rfid_card if the column exists (will be ignored if it doesn't)
    // Try to add it, but don't fail if column doesn't exist
    try {
      attendanceRecord.rfid_card = scanData.rfidCard || null
    } catch (e) {
      // Ignore if column doesn't exist
    }
    
    // Also try type field for compatibility
    try {
      attendanceRecord.type = scanType
    } catch (e) {
      // Ignore if column doesn't exist
    }
    
    const { data: newRecord, error: insertError } = await supabaseClient
      .from('attendance_records')
      .insert([attendanceRecord])
      .select(`
        *,
        students (
          student_id,
          first_name,
          last_name,
          grade_level,
          section,
          photo_url,
          profile_picture,
          picture
        )
      `)
      .single()

    if (insertError) {
      console.error('Database error:', insertError)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('Scan data (dev mode):', { studentId, scanType, timeIn, timeOut })
        return NextResponse.json({
          success: true,
          message: 'Scan recorded (dev mode - not saved to database)',
          scanType,
          timeIn,
          timeOut,
        })
      }
      
      return NextResponse.json(
        { success: false, error: insertError.message },
        { status: 500 }
      )
    }

    // Format the response
    const formattedRecord = {
      id: newRecord.id,
      studentId: newRecord.student_id || newRecord.students?.student_id,
      studentName: newRecord.students 
        ? `${newRecord.students.first_name || ''} ${newRecord.students.last_name || ''}`.trim()
        : 'Unknown Student',
      gradeLevel: newRecord.students?.grade_level || 'N/A',
      section: newRecord.students?.section || 'N/A',
      scanTime: newRecord.scan_time || newRecord.created_at,
      status: newRecord.status || 'Present',
      rfidCard: newRecord.rfid_card || 'N/A',
      studentPhoto: newRecord.students?.photo_url || newRecord.students?.profile_picture || newRecord.students?.picture || null,
      scanType: scanType,
      timeIn: newRecord.time_in || null,
      timeOut: newRecord.time_out || null,
    }

    return NextResponse.json({
      success: true,
      record: formattedRecord,
      message: `Time ${scanType === 'timein' ? 'In' : 'Out'} recorded successfully`,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error: any) {
    console.error('Record attendance API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}
