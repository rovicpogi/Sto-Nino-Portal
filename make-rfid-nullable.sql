-- SQL script to make required columns nullable in attendance_records
-- Run this if you're getting NOT NULL constraint errors

-- Make rfid_tag nullable (remove NOT NULL constraint if it exists)
ALTER TABLE attendance_records 
ALTER COLUMN rfid_tag DROP NOT NULL;

-- Make rfid_card nullable (remove NOT NULL constraint if it exists)
ALTER TABLE attendance_records 
ALTER COLUMN rfid_card DROP NOT NULL;

-- Make device_id nullable (remove NOT NULL constraint if it exists)
ALTER TABLE attendance_records 
ALTER COLUMN device_id DROP NOT NULL;

-- Change device_id from UUID to TEXT (if it's currently UUID type)
-- This allows storing device identifiers like "ESP32"
ALTER TABLE attendance_records 
ALTER COLUMN device_id TYPE TEXT USING device_id::TEXT;

-- Verify the columns are now nullable
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'attendance_records' 
AND column_name IN ('rfid_card', 'rfid_tag', 'device_id');

