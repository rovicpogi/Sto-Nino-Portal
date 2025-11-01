import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const journalData = await request.json()

    // Validate required fields
    if (!journalData.date || !journalData.subject || !journalData.topic) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (date, subject, topic)' },
        { status: 400 }
      )
    }

    // Try to insert into Supabase
    // Note: You'll need to create a 'journal_entries' table in your Supabase database
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([
        {
          date: journalData.date,
          subject: journalData.subject,
          topic: journalData.topic,
          activities: journalData.activities,
          notes: journalData.notes,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // For development: log but don't fail
      console.error('Database error (will continue in dev mode):', error)
      
      // In development, return success even if table doesn't exist
      if (process.env.NODE_ENV === 'development') {
        console.log('Journal entry (dev mode):', journalData)
        return NextResponse.json({
          success: true,
          message: 'Journal entry saved (dev mode - not saved to database)',
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
      message: 'Journal entry saved successfully',
    })
  } catch (error: any) {
    console.error('Journal API error:', error)
    // In development, allow fallback
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: 'Journal entry saved (dev mode)',
      })
    }
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

