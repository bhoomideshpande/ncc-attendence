-- Emergency: revoke direct access from anon/authenticated roles
-- Run if you need to quickly stop public API access to the staff table.

REVOKE ALL PRIVILEGES ON TABLE public.staff FROM public;
REVOKE ALL PRIVILEGES ON TABLE public.staff FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.staff FROM authenticated;

-- After this you can selectively re-grant minimal privileges, e.g.:
-- GRANT SELECT ON public.staff TO authenticated;
