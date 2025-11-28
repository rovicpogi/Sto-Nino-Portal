import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const updateData = await request.json()

    // Validate required fields
    if (!updateData.email && !updateData.studentId) {
      return NextResponse.json(
        { success: false, error: 'Email or Student ID is required' },
        { status: 400 }
      )
    }

    if (!updateData.rfidCard) {
      return NextResponse.json(
        { success: false, error: 'RFID Card number is required' },
        { status: 400 }
      )
    }

    const admin = getSupabaseAdmin()

    if (!admin) {
      console.error('Supabase admin client not initialized')
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'RFID updated (dev mode - not saved to database)',
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

    // Build query to find student
    let students: any[] = []
    let findError: any = null
    
    if (updateData.email) {
      // Find by email
      const { data, error } = await admin
        .from('students')
        .select('*')
        .eq('email', updateData.email.toLowerCase().trim())
        .limit(10)
      students = data || []
      findError = error
    } else if (updateData.studentId) {
      // Find by student ID - get all and filter in memory to avoid column errors
      const { data: allStudents, error } = await admin
        .from('students')
        .select('*')
        .limit(1000)
      
      if (!error && allStudents) {
        students = allStudents.filter((s: any) => {
          const id1 = (s.student_id || '').toString()
          const id2 = (s.student_number || '').toString()
          const id3 = (s.id || '').toString()
          const id4 = (s.studentId || '').toString()
          const searchId = updateData.studentId.toString()
          return id1 === searchId || id2 === searchId || id3 === searchId || id4 === searchId
        })
      } else {
        findError = error
      }
    }

    if (findError) {
      console.error('Database error finding student:', findError)
      return NextResponse.json(
        { success: false, error: findError.message },
        { status: 500 }
      )
    }

    if (!students || students.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const student = students[0]

    // Update student with RFID card number
    // Try to update rfid_tag first (most common column name)
    // If that fails, the column doesn't exist and user needs to add it
    const updateFields: any = {
      rfid_tag: updateData.rfidCard
    }

    console.log('Updating student with RFID:', updateData.rfidCard)
    console.log('Student ID:', student.id)
    console.log('Student email:', student.email)

    const { data: updatedStudent, error: updateError } = await admin
      .from('students')
      .update(updateFields)
      .eq('id', student.id)
      .select()
      .single()

    if (updateError) {
      console.error('Database error updating RFID:', updateError)
      console.error('Error message:', updateError.message)
      
      // Check if error is about missing column
      if (updateError.message && (
        updateError.message.includes('column') && 
        updateError.message.includes('does not exist') ||
        updateError.message.includes('rfid_tag') ||
        updateError.message.includes('rfid_card')
      )) {
        return NextResponse.json(
          { 
            success: false, 
            error: `RFID column not found in database. Please add an 'rfid_tag' column to your 'students' table in Supabase. See add-rfid-column.sql for SQL script.`,
            hint: 'Run this SQL in Supabase: ALTER TABLE students ADD COLUMN rfid_tag TEXT;'
          },
          { status: 500 }
        )
      }
      
      // Other database errors
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to update RFID: ${updateError.message}`,
          details: 'Please check your database connection and permissions.'
        },
        { status: 500 }
      )
    }

    // Remove password from response
    const studentWithoutPassword = { ...updatedStudent }
    if (studentWithoutPassword.Password !== undefined) {
      delete studentWithoutPassword.Password
    }
    if (studentWithoutPassword.password !== undefined) {
      delete studentWithoutPassword.password
    }

    return NextResponse.json({
      success: true,
      student: studentWithoutPassword,
      message: 'RFID card number updated successfully',
    })
  } catch (error: any) {
    console.error('Update RFID API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}

