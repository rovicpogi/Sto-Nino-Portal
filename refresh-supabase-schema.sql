-- Refresh PostgREST schema cache
-- This ensures Supabase recognizes newly added columns immediately
-- Run this in Supabase SQL Editor after adding columns

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

-- Verify the column exists
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'teachers' 
  AND column_name IN ('rfid_card', 'rfid_tag')
ORDER BY column_name;

