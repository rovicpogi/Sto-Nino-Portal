import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const admissionData = await request.json()

    // Validate required fields
    if (!admissionData.studentName || !admissionData.email || !admissionData.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Try to insert into Supabase
    // Note: You'll need to create an 'admissions' table in your Supabase database
    const { data, error } = await supabase
      .from('admissions')
      .insert([
        {
          student_name: admissionData.studentName,
          parent_name: admissionData.parentName,
          email: admissionData.email,
          phone: admissionData.phone,
          grade_level: admissionData.gradeLevel,
          previous_school: admissionData.previousSchool,
          message: admissionData.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // For development: log but don't fail
      console.error('Database error (will continue in dev mode):', error)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('Admission data (dev mode):', admissionData)
        return NextResponse.json({
          success: true,
          message: 'Admission submitted (dev mode - not saved to database)',
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
      message: 'Admission inquiry submitted successfully',
    })
  } catch (error: any) {
    console.error('Admissions API error:', error)
    // In development, allow fallback
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: 'Admission submitted (dev mode)',
      })
    }
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

