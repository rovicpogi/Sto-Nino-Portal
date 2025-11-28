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
    let query = admin.from('students').select('*')
    
    if (updateData.email) {
      query = query.eq('email', updateData.email.toLowerCase().trim())
    } else if (updateData.studentId) {
      // Try both student_id and student_number fields
      query = query.or(`student_id.eq.${updateData.studentId},student_number.eq.${updateData.studentId}`)
    }

    const { data: students, error: findError } = await query

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
    // Try to update both rfid_card and rfid_tag fields (depending on database schema)
    const updateFields: any = {
      rfid_tag: updateData.rfidCard, // Primary field in database
    }
    
    // Also try to update rfid_card if the column exists
    updateFields.rfid_card = updateData.rfidCard
    updateFields.rfidCard = updateData.rfidCard

    const { data: updatedStudent, error: updateError } = await admin
      .from('students')
      .update(updateFields)
      .eq('id', student.id)
      .select()
      .single()

    if (updateError) {
      console.error('Database error updating RFID:', updateError)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('RFID update (dev mode):', { email: updateData.email, rfidCard: updateData.rfidCard })
        return NextResponse.json({
          success: true,
          message: 'RFID updated (dev mode - not saved to database)',
        })
      }
      
      return NextResponse.json(
        { success: false, error: updateError.message },
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

