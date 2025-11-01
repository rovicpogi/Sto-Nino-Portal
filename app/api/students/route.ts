import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const studentData = await request.json()

    // Validate required fields
    if (!studentData.name || !studentData.studentId || !studentData.gradeLevel || !studentData.section) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, studentId, gradeLevel, section)' },
        { status: 400 }
      )
    }

    // Try to insert into Supabase
    // Note: You'll need to create a 'students' table in your Supabase database
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          name: studentData.name,
          student_id: studentData.studentId,
          grade_level: studentData.gradeLevel,
          section: studentData.section,
          email: studentData.email || null,
          phone: studentData.phone || null,
          status: 'enrolled',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // For development: log but don't fail
      console.error('Database error (will continue in dev mode):', error)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('Student data (dev mode):', studentData)
        return NextResponse.json({
          success: true,
          message: 'Student added (dev mode - not saved to database)',
        })
      }
      
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Student added successfully',
    })
  } catch (error: any) {
    console.error('Students API error:', error)
    // In development, allow fallback
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: 'Student added (dev mode)',
      })
    }
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

