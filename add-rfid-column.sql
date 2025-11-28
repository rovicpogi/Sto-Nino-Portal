-- SQL script to add RFID column to students table in Supabase
-- Run this in your Supabase SQL Editor

-- Add rfid_card column (primary - what ESP32 looks for)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

-- Also add rfid_tag as backup (optional)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_tag TEXT;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_rfid_card ON students(rfid_card);
CREATE INDEX IF NOT EXISTS idx_students_rfid_tag ON students(rfid_tag);

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'students' 
AND column_name LIKE '%rfid%';

