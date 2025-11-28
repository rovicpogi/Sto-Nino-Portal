-- SQL script to fix scan_type check constraint in attendance_records
-- The constraint might only allow specific values like 'time_in'/'time_out' instead of 'timein'/'timeout'

-- Step 1: Drop the existing check constraint
ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_scan_type_check;

-- Step 2: Create a new, more flexible check constraint
-- This allows both formats: 'timein'/'timeout' and 'time_in'/'time_out'
CREATE CONSTRAINT IF NOT EXISTS attendance_records_scan_type_check 
ON attendance_records 
CHECK (
  scan_type IS NULL 
  OR scan_type IN ('timein', 'timeout', 'time_in', 'time_out', 'Time In', 'Time Out', 'TIME IN', 'TIME OUT')
);

-- Alternative: If you want to allow any text value, you can skip the constraint entirely
-- Just run the DROP CONSTRAINT command above and don't recreate it

-- Verify the constraint was updated
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass
AND conname LIKE '%scan_type%';

