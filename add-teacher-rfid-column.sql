-- Add RFID card column to teachers table
-- Run this SQL in Supabase SQL Editor

-- Add rfid_card column if it doesn't exist
ALTER TABLE teachers 
ADD COLUMN IF NOT EXISTS rfid_card TEXT;

-- Also add rfid_tag for compatibility (if needed)
ALTER TABLE teachers 
ADD COLUMN IF NOT EXISTS rfid_tag TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_teachers_rfid_card ON teachers(rfid_card);
CREATE INDEX IF NOT EXISTS idx_teachers_rfid_tag ON teachers(rfid_tag);

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'teachers' 
  AND column_name IN ('rfid_card', 'rfid_tag');

