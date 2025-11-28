-- SQL script to add RFID column to students table in Supabase
-- Run this in your Supabase SQL Editor

-- Option 1: Add rfid_tag column (recommended)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_tag TEXT;

-- Option 2: Add rfid_card column (alternative)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

-- Option 3: Add rfidCard column (alternative naming)
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS "rfidCard" TEXT;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_rfid_tag ON students(rfid_tag);
CREATE INDEX IF NOT EXISTS idx_students_rfid_card ON students(rfid_card);

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'students' 
AND column_name LIKE '%rfid%';

