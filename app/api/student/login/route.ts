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

    // Query the students table (case-insensitive email search)
    const emailLower = email.toLowerCase().trim()
    const { data: students, error } = await admin
      .from('students')
      .select('*')
      .limit(10)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { ok: false, error: 'Database connection error. Please try again.' },
        { status: 500 }
      )
    }

    // Find student by email (case-insensitive)
    const student = students?.find((s: any) => 
      s.email && s.email.toLowerCase().trim() === emailLower
    )

    if (!student) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check for Password field (both lowercase and capitalized)
    const studentPassword = student.Password !== undefined ? student.Password : 
                           student.password !== undefined ? student.password : null

    if (!studentPassword || studentPassword !== password) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return student data (excluding password)
    const studentWithoutPassword = { ...student }
    if (studentWithoutPassword.Password !== undefined) delete studentWithoutPassword.Password
    if (studentWithoutPassword.password !== undefined) delete studentWithoutPassword.password

    return NextResponse.json({
      ok: true,
      user: studentWithoutPassword,
      userType: 'student',
    })
  } catch (e: any) {
    console.error('Student login error:', e)
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}

