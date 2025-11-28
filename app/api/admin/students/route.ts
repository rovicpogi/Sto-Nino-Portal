import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

const mockStudents = [
  {
    id: 1,
    name: 'Ana Dela Cruz',
    student_id: 'SNPA-2024-001',
    grade_level: 'Grade 7',
    section: 'St. Mary',
    email: 'ana.delacruz@example.com',
    status: 'Enrolled',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Miguel Santos',
    student_id: 'SNPA-2024-002',
    grade_level: 'Grade 8',
    section: 'St. Joseph',
    email: 'miguel.santos@example.com',
    status: 'Pending',
    created_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({
        success: true,
        students: mockStudents,
        mock: true,
      })
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch students',
        students: [],
      })
    }

    return NextResponse.json({
      success: true,
      students: data || [],
    })
  } catch (error: any) {
    console.error('Students API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        students: mockStudents,
        mock: true,
      },
      { status: 500 }
    )
  }
}

