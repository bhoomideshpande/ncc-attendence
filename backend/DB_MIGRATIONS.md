Database migration steps for securing `public.staff`

1) Add `password_hash` column

Run the SQL in `backend/db_migrations/002_add_password_hash_and_migrate.sql` as a superuser or DB owner.

Example (psql):

```bash
psql "postgres://USER:PASS@HOST:PORT/DBNAME" -f backend/db_migrations/002_add_password_hash_and_migrate.sql
```

2) Populate `password_hash`

Run the Node migration which will read existing rows, copy or hash passwords into `password_hash`:

```bash
cd backend
node scripts/migrate_passwords.js
```

Verify rows now have `password_hash` populated.

3) Update database: drop legacy column

After you confirm the migration, drop the old column:

```sql
ALTER TABLE public.staff DROP COLUMN password;
```

4) Enable RLS and add policies

Run the SQL in `backend/db_migrations/001_enable_rls_and_policies.sql`.

Example:

```bash
psql "postgres://USER:PASS@HOST:PORT/DBNAME" -f backend/db_migrations/001_enable_rls_and_policies.sql
```

5) Emergency revoke (optional)

If you need to quickly stop public access, run:

```bash
psql "postgres://USER:PASS@HOST:PORT/DBNAME" -f backend/db_migrations/003_revoke_anon.sql
```

6) Notes
- These policies expect JWT claims `email` and `role` to be set for the session. If you use `sub`/`uid` instead, update the policy SQL accordingly.
- Make a DB backup before running any destructive SQL commands.
