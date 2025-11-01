import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    // Fetch students count
    const { count: studentsCount, error: studentsError } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })

    // Fetch teachers count
    const { count: teachersCount, error: teachersError } = await supabase
      .from('teachers')
      .select('*', { count: 'exact', head: true })

    if (studentsError || teachersError) {
      console.error('Database error:', { studentsError, teachersError })
      // Return mock data if database is not available
      return NextResponse.json({
        success: true,
        data: {
          totalStudents: 0,
          totalTeachers: 0,
          attendanceRate: 0,
        },
        mock: true,
      })
    }

    // Calculate attendance (this would need actual attendance data)
    // For now, we'll return 0 and calculate it later when we have attendance table
    const attendanceRate = 0

    return NextResponse.json({
      success: true,
      data: {
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        attendanceRate,
      },
    })
  } catch (error: any) {
    console.error('Admin stats API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        data: {
          totalStudents: 0,
          totalTeachers: 0,
          attendanceRate: 0,
        },
        mock: true,
      },
      { status: 500 }
    )
  }
}

