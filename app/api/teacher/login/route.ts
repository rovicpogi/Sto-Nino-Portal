import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const admin = getSupabaseAdmin()

    // Query the teachers table (case-insensitive email search)
    const emailLower = email.toLowerCase().trim()
    const { data: teachers, error } = await admin
      .from('teachers')
      .select('*')
      .limit(10)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { ok: false, error: 'Database connection error. Please try again.' },
        { status: 500 }
      )
    }

    // Find teacher by email (case-insensitive)
    const teacher = teachers?.find((t: any) => 
      t.email && t.email.toLowerCase().trim() === emailLower
    )

    if (!teacher) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check for Password field (both lowercase and capitalized)
    const teacherPassword = teacher.Password !== undefined ? teacher.Password : 
                           teacher.password !== undefined ? teacher.password : null

    if (!teacherPassword || teacherPassword !== password) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return teacher data (excluding password)
    const teacherWithoutPassword = { ...teacher }
    if (teacherWithoutPassword.Password !== undefined) delete teacherWithoutPassword.Password
    if (teacherWithoutPassword.password !== undefined) delete teacherWithoutPassword.password

    return NextResponse.json({
      ok: true,
      user: teacherWithoutPassword,
      userType: 'teacher',
    })
  } catch (e: any) {
    console.error('Teacher login error:', e)
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}

