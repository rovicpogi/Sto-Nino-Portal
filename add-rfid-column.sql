-- SQL script to add RFID columns to Supabase tables
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. Add RFID column to students table
-- ============================================
-- Add rfid_card column (primary - what ESP32 looks for)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

-- Also add rfid_tag as backup (optional)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_tag TEXT;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_rfid_card ON students(rfid_card);
CREATE INDEX IF NOT EXISTS idx_students_rfid_tag ON students(rfid_tag);

-- ============================================
-- 2. Add RFID column to attendance_records table
-- ============================================
-- Add rfid_card column to attendance_records
ALTER TABLE attendance_records 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_attendance_rfid_card ON attendance_records(rfid_card);

-- ============================================
-- 3. Verify columns were added
-- ============================================
-- Check students table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'students' 
AND column_name LIKE '%rfid%';

-- Check attendance_records table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'attendance_records' 
AND column_name LIKE '%rfid%';

