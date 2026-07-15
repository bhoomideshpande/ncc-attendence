-- Add `password_hash` column to public.staff.
-- After running this SQL, run the JS migration script `backend/scripts/migrate_passwords.js`
-- which will populate `password_hash` from existing `password` values (hashing if needed),
-- then you can DROP the old `password` column.

BEGIN;

ALTER TABLE public.staff
  ADD COLUMN IF NOT EXISTS password_hash text;

-- Leave existing `password` column in place until the migration script finishes.

COMMIT;

-- After successful migration, run:
-- ALTER TABLE public.staff DROP COLUMN password;
