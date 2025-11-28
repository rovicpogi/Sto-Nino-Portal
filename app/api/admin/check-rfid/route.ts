import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// Enable CORS for ESP32 requests
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// GET - Check if RFID is assigned to a student
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rfidCard = searchParams.get('rfid')
    
    if (!rfidCard) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RFID card parameter is required',
          assigned: false
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }

    // Normalize RFID card
    const rfidNormalized = rfidCard.toString().trim().toUpperCase().replace(/\s+/g, '')
    const rfidNoLeadingZeros = rfidNormalized.replace(/^0+/, '')
    
    console.log(`Checking RFID: ${rfidNormalized}`)
    
    // Try to find student by RFID
    const { data: students, error: studentError } = await supabase
      .from('students')
      .select('student_id, student_number, rfid_card, rfidCard, rfid_tag, first_name, last_name, email, grade_level, section')
      .or(`rfid_card.eq.${rfidNormalized},rfidCard.eq.${rfidNormalized},rfid_tag.eq.${rfidNormalized},rfid_card.eq.${rfidNoLeadingZeros},rfidCard.eq.${rfidNoLeadingZeros},rfid_tag.eq.${rfidNoLeadingZeros}`)
      .limit(1)

    if (studentError) {
      console.error('Error checking RFID:', studentError)
      return NextResponse.json(
        { 
          success: false, 
          error: `Database error: ${studentError.message}`,
          assigned: false,
          searchedRfid: rfidNormalized
        },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }

    if (!students || students.length === 0) {
      // Try partial match
      const { data: partialMatch } = await supabase
        .from('students')
        .select('student_id, student_number, rfid_card, rfidCard, rfid_tag, first_name, last_name, email, grade_level, section')
        .or(`rfid_card.ilike.%${rfidNormalized}%,rfidCard.ilike.%${rfidNormalized}%,rfid_tag.ilike.%${rfidNormalized}%`)
        .limit(1)
      
      if (partialMatch && partialMatch.length > 0) {
        const student = partialMatch[0]
        return NextResponse.json({
          success: true,
          assigned: true,
          student: {
            studentId: student.student_id || student.student_number,
            name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
            email: student.email,
            gradeLevel: student.grade_level,
            section: student.section,
            rfidCard: student.rfid_card || student.rfidCard || student.rfid_tag,
          },
          searchedRfid: rfidNormalized,
          matchType: 'partial'
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        })
      }
      
      return NextResponse.json({
        success: true,
        assigned: false,
        message: `RFID ${rfidNormalized} is not assigned to any student`,
        searchedRfid: rfidNormalized
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Student found!
    const student = students[0]
    return NextResponse.json({
      success: true,
      assigned: true,
      student: {
        studentId: student.student_id || student.student_number,
        name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
        email: student.email,
        gradeLevel: student.grade_level,
        section: student.section,
        rfidCard: student.rfid_card || student.rfidCard || student.rfid_tag,
      },
      searchedRfid: rfidNormalized,
      matchType: 'exact'
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error: any) {
    console.error('Check RFID API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
        assigned: false,
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}

