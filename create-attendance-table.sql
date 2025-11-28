-- SQL script to create/update attendance_records table in Supabase
-- Run this in your Supabase SQL Editor

-- Create attendance_records table if it doesn't exist
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT,
  rfid_card TEXT,
  scan_time TIMESTAMPTZ,
  scan_type TEXT,
  type TEXT,
  time_in TIMESTAMPTZ,
  time_out TIMESTAMPTZ,
  status TEXT DEFAULT 'Present',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if table exists but columns are missing
ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS student_id TEXT;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS scan_time TIMESTAMPTZ;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS scan_type TEXT;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS type TEXT;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS time_in TIMESTAMPTZ;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS time_out TIMESTAMPTZ;

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Present';

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_scan_time ON attendance_records(scan_time);
CREATE INDEX IF NOT EXISTS idx_attendance_rfid_card ON attendance_records(rfid_card);
CREATE INDEX IF NOT EXISTS idx_attendance_scan_type ON attendance_records(scan_type);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'attendance_records'
ORDER BY ordinal_position;

