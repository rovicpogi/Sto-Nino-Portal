import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
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
        students: [],
      },
      { status: 500 }
    )
  }
}

