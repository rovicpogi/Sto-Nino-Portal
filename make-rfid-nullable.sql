-- SQL script to make rfid_tag and rfid_card nullable in attendance_records
-- Run this if you're getting NOT NULL constraint errors

-- Make rfid_tag nullable (remove NOT NULL constraint if it exists)
ALTER TABLE attendance_records 
ALTER COLUMN rfid_tag DROP NOT NULL;

-- Make rfid_card nullable (remove NOT NULL constraint if it exists)
ALTER TABLE attendance_records 
ALTER COLUMN rfid_card DROP NOT NULL;

-- Verify the columns are now nullable
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'attendance_records' 
AND column_name IN ('rfid_card', 'rfid_tag');

