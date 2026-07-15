-- Enable RLS on public.staff and add restrictive policies
-- Run this as a superuser / DB owner against your Postgres database

BEGIN;

-- Enable row level security
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Policy: staff can SELECT their own row (match on JWT email claim)
CREATE POLICY staff_select_own ON public.staff
  FOR SELECT
  USING (
    (current_setting('jwt.claims', true)::json->>'email') = email
  );

-- Policy: staff can UPDATE their own row
CREATE POLICY staff_update_own ON public.staff
  FOR UPDATE
  USING (
    (current_setting('jwt.claims', true)::json->>'email') = email
  )
  WITH CHECK (
    (current_setting('jwt.claims', true)::json->>'email') = email
  );

-- Policy: admins (JWT claim role='admin') can do all actions
CREATE POLICY staff_admin_all ON public.staff
  FOR ALL
  USING (
    (current_setting('jwt.claims', true)::json->>'role') = 'admin'
  )
  WITH CHECK (
    (current_setting('jwt.claims', true)::json->>'role') = 'admin'
  );

COMMIT;

-- Notes:
-- * These policies assume your JWT contains `email` and `role` claims.
-- * If you use `sub` (user id) in JWT, replace `(current_setting('jwt.claims', true)::json->>'email') = email`
--   with `(current_setting('jwt.claims', true)::json->>'sub') = id::text`.
-- * Test policies with a controlled admin session before granting any public access.
