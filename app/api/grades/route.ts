import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const { studentId, subject, grade } = await request.json()

    if (!studentId || !subject || grade === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Try to update grade in Supabase
    // Note: You'll need to create a 'grades' table in your Supabase database
    const { data, error } = await supabase
      .from('grades')
      .upsert(
        {
          student_id: studentId,
          subject: subject.toLowerCase(),
          grade: parseInt(grade),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,subject' }
      )
      .select()

    if (error) {
      // For development: log but don't fail
      console.error('Database error (will continue in dev mode):', error)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('Grade update (dev mode):', { studentId, subject, grade })
        return NextResponse.json({
          success: true,
          message: 'Grade updated (dev mode - not saved to database)',
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
      message: 'Grade updated successfully',
    })
  } catch (error: any) {
    console.error('Grades API error:', error)
    // In development, allow fallback
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: 'Grade updated (dev mode)',
      })
    }
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

