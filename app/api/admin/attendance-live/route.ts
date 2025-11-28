import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

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
  // Set default headers for all responses
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const since = searchParams.get('since') // Optional: get records since this timestamp

    // Use admin client to avoid RLS UUID/TEXT comparison errors
    let supabaseClient
    try {
      supabaseClient = getSupabaseAdmin()
    } catch (clientError: any) {
      console.error('Failed to get Supabase admin client:', clientError)
      return NextResponse.json({
        success: false,
        error: 'Database client initialization failed',
        records: [],
        details: process.env.NODE_ENV === 'development' ? clientError?.message : undefined,
      }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (!supabaseClient) {
      return NextResponse.json({
        success: false,
        error: 'Database client not available',
        records: [],
      }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Fetch recent attendance records
    // Don't use join to avoid foreign key issues - fetch students separately
    let data: any[] = []
    let error: any = null
    
    try {
      console.log('Attempting to fetch attendance records...')
      console.log('Limit:', limit)
      console.log('Since:', since)
      
      // Try a simple query first - just get count to test connection
      const { count, error: countError } = await supabaseClient
        .from('attendance_records')
        .select('*', { count: 'exact', head: true })
      
      if (countError) {
        console.error('Count query error:', countError)
        console.error('Error code:', countError.code)
        console.error('Error message:', countError.message)
        console.error('Error details:', countError.details)
        console.error('Error hint:', countError.hint)
        error = countError
      } else {
        console.log('Count query successful, count:', count)
        
        // Now try the actual query
        let query = supabaseClient
          .from('attendance_records')
          .select('id, scan_time, scan_type, student_id, rfid_card, status') // Select only needed columns
          .order('scan_time', { ascending: false })
          .limit(limit)

        // If 'since' parameter is provided, filter records after that time
        if (since) {
          query = query.gt('scan_time', since)
        }

        const result = await query
        data = result.data || []
        error = result.error
        
        if (error) {
          console.error('Select query error:', error)
          console.error('Error code:', error.code)
          console.error('Error message:', error.message)
          console.error('Error details:', error.details)
          console.error('Error hint:', error.hint)
        } else {
          console.log('Select query successful, records:', data.length)
        }
      }
    } catch (queryError: any) {
      console.error('Query execution exception:', queryError)
      console.error('Exception name:', queryError.name)
      console.error('Exception message:', queryError.message)
      console.error('Exception stack:', queryError.stack)
      error = queryError
    }

    if (error) {
      console.error('Database error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      
      // Return empty records instead of failing completely
      // This allows the frontend to still work even if there's a database issue
      return NextResponse.json({
        success: true, // Return success with empty records
        records: [],
        warning: 'Unable to fetch attendance records from database',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        details: process.env.NODE_ENV === 'development' ? {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        } : undefined,
      }, { 
        status: 200, // Return 200 with empty records instead of 500
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Fetch student information for all records
    // student_id in attendance_records is now TEXT, so we need to handle it carefully
    const studentIds = [...new Set((data || []).map((r: any) => r.student_id).filter(Boolean))]
    const studentMap: Record<string, any> = {}
    
    if (studentIds.length > 0) {
      try {
        // Fetch all students and filter in memory to avoid UUID/TEXT comparison issues
        const { data: allStudents, error: studentsError } = await supabaseClient
          .from('students')
          .select('*')
          .limit(1000)
        
        if (studentsError) {
          console.error('Error fetching students:', studentsError)
          // Continue without student info rather than failing completely
        } else if (allStudents) {
          // Create a map for quick lookup - check all possible ID fields
          allStudents.forEach((student: any) => {
            const studentIdStr = (student.student_id || '').toString().trim()
            const studentNumberStr = (student.student_number || '').toString().trim()
            const studentIdUuid = (student.id || '').toString().trim()
            
            // Map by all possible identifiers
            if (studentIdStr) studentMap[studentIdStr] = student
            if (studentNumberStr) studentMap[studentNumberStr] = student
            if (studentIdUuid) studentMap[studentIdUuid] = student
          })
        }
      } catch (studentsFetchError: any) {
        console.error('Error in student fetch:', studentsFetchError)
        // Continue without student info
      }
    }

    // Format the response
    const formattedRecords = (data || []).map((record: any) => {
      // Determine scan type from database fields
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
      
      // Get student info from map
      const student = studentMap[record.student_id] || null
      
      return {
        id: record.id,
        studentId: record.student_id,
        studentName: student
          ? `${student.first_name || student.firstName || ''} ${student.last_name || student.lastName || ''}`.trim() || student.name || 'Unknown Student'
          : 'Unknown Student',
        gradeLevel: student?.grade_level || student?.gradeLevel || 'N/A',
        section: student?.section || 'N/A',
        scanTime: record.scan_time || record.created_at,
        status: record.status || 'Present',
        rfidCard: record.rfid_card || 'N/A',
        studentPhoto: student?.photo_url || student?.profile_picture || student?.picture || null,
        scanType: scanType,
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
    console.error('Error stack:', error?.stack)
    console.error('Error name:', error?.name)
    console.error('Error message:', error?.message)
    
    // Always return JSON, never let Next.js return HTML error page
    try {
      return NextResponse.json(
        {
          success: true, // Return success with empty records to prevent frontend crash
          records: [],
          warning: 'Unable to fetch attendance records',
          error: error?.message || 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? {
            stack: error?.stack,
            name: error?.name,
            message: error?.message,
          } : undefined,
        },
        { 
          status: 200, // Return 200 to prevent frontend from treating it as an error
          headers: defaultHeaders,
        }
      )
    } catch (jsonError: any) {
      // Even if JSON creation fails, return a simple text response as JSON
      console.error('Failed to create JSON response:', jsonError)
      return new NextResponse(
        JSON.stringify({
          success: true,
          records: [],
          warning: 'Service temporarily unavailable',
        }),
        {
          status: 200,
          headers: defaultHeaders,
        }
      )
    }
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

    // Use admin client for inserts to bypass RLS policies
    // This avoids UUID/TEXT comparison errors in RLS policies
    const supabaseClient = getSupabaseAdmin()
    
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
      
      // Use student_number or student_id (TEXT) - NOT the UUID id
      // attendance_records.student_id is TEXT type, so we store TEXT values
      studentId = matchedStudent.student_number || matchedStudent.student_id || matchedStudent.studentId || matchedStudent.id?.toString()
    }

    // Check if student has already scanned in today
    // student_id is now TEXT type, so we can query directly
    // But we need to cast to text to avoid UUID comparison errors
    let todayRecords: any[] = []
    let checkError: any = null
    
    // Fetch all records for today, then filter in memory to avoid type mismatch
    const { data: allTodayRecords, error: fetchError } = await supabaseClient
      .from('attendance_records')
      .select('id, scan_type, scan_time, time_in, time_out, student_id')
      .gte('scan_time', todayStart)
      .lte('scan_time', todayEndISO)
      .order('scan_time', { ascending: true })
    
    if (fetchError) {
      checkError = fetchError
      console.error('Error fetching today records:', fetchError)
    } else if (allTodayRecords) {
      // Filter in memory by student_id (text match) to avoid UUID/TEXT comparison issues
      todayRecords = allTodayRecords.filter((r: any) => {
        const rId = (r.student_id || '').toString().trim()
        const sId = (studentId || '').toString().trim()
        return rId === sId || rId === studentId || sId === r.student_id
      })
    }

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
    // Build insert object with all required fields
    const attendanceRecord: any = {
      student_id: studentId,
    }
    
    // Add RFID fields - set both rfid_card and rfid_tag to avoid NOT NULL constraint errors
    const rfidValue = scanData.rfidCard || ''
    if (rfidValue) {
      attendanceRecord.rfid_card = rfidValue
      attendanceRecord.rfid_tag = rfidValue  // Some schemas use rfid_tag instead
    } else {
      // If no RFID provided, set empty string to avoid NOT NULL constraint
      attendanceRecord.rfid_card = ''
      attendanceRecord.rfid_tag = ''
    }
    
    // Set device_id - if column is UUID type, we can't use text, so set to null
    // If column is TEXT type, we can use a device identifier
    // For now, don't set it to avoid UUID type errors
    // attendanceRecord.device_id = scanData.deviceId || null
    
    attendanceRecord.scan_time = currentTime
    attendanceRecord.scan_type = scanType
    attendanceRecord.time_in = timeIn
    attendanceRecord.time_out = timeOut
    attendanceRecord.status = scanType === 'timein' ? 'Present' : 'Present'
    attendanceRecord.created_at = currentTime
    
    // Optional type field for compatibility
    attendanceRecord.type = scanType
    
    // Insert the attendance record (without join to avoid foreign key issues)
    const { data: newRecord, error: insertError } = await supabaseClient
      .from('attendance_records')
      .insert([attendanceRecord])
      .select('*')
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
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        })
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: insertError.message,
          hint: 'Please check that all required columns exist in attendance_records table. Run create-attendance-table.sql in Supabase.'
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

    // Fetch student information separately to avoid join issues
    // Fetch all students and filter in memory to avoid UUID/TEXT comparison errors
    let studentInfo: any = null
    if (studentId) {
      // Fetch all students and filter in memory
      const { data: allStudents } = await supabaseClient
        .from('students')
        .select('*')
        .limit(1000)
      
      if (allStudents) {
        // Find matching student by comparing as strings
        const studentIdStr = (studentId || '').toString().trim()
        studentInfo = allStudents.find((student: any) => {
          const sId = (student.student_id || '').toString().trim()
          const sNum = (student.student_number || '').toString().trim()
          const sUuid = (student.id || '').toString().trim()
          return sId === studentIdStr || sNum === studentIdStr || sUuid === studentIdStr
        }) || null
      }
    }

    // Format the response
    const formattedRecord = {
      id: newRecord.id,
      studentId: newRecord.student_id || studentId,
      studentName: studentInfo
        ? `${studentInfo.first_name || studentInfo.firstName || ''} ${studentInfo.last_name || studentInfo.lastName || ''}`.trim() || studentInfo.name || 'Unknown Student'
        : 'Unknown Student',
      gradeLevel: studentInfo?.grade_level || studentInfo?.gradeLevel || 'N/A',
      section: studentInfo?.section || 'N/A',
      scanTime: newRecord.scan_time || newRecord.created_at,
      status: newRecord.status || 'Present',
      rfidCard: newRecord.rfid_card || scanData.rfidCard || 'N/A',
      studentPhoto: studentInfo?.photo_url || studentInfo?.profile_picture || studentInfo?.picture || null,
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
    console.error('Error stack:', error?.stack)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}
