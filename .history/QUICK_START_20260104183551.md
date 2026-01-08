# PostgreSQL Supabase - Quick Start Guide

## ⏱️ 5-Minute Setup

### 1️⃣ Supabase Account (2 minutes)
```
Go to: https://supabase.com
Click: Sign up → GitHub
```

### 2️⃣ Create Project (2 minutes)
```
Project Name: attendance-n-guard
Password: Save it!
Region: Closest to you
Wait: 2 minutes
```

### 3️⃣ Get Connection String (1 minute)
```
Go to: Settings > Database
Copy: Connection String (URI)
Looks like: postgresql://postgres.xxx:password@aws-0-xxx.pooler.supabase.com:5432/postgres?sslmode=require
```

### 4️⃣ Update Backend
```
Open: backend/.env
Find: DATABASE_URL=...
Replace: Paste your connection string
Save: Ctrl+S
```

### 5️⃣ Start Backend
```bash
cd backend
npm run dev
```

✅ You should see:
```
PostgreSQL connected successfully!
PostgreSQL database synced
Server running on port 5001
```

## ✨ All Done!

Now test:

### Register (in browser console or Postman)
```javascript
fetch('http://localhost:5001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'STAFF-001',
    email: 'test@example.com',
    password: 'Test@123',
    institute: 'NCC-2024'
  })
})
```

### Login
```javascript
fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'Test@123'
  })
})
```

## 🎯 Frontend Still Works
No changes needed! Start normally:
```bash
npm run dev
```

## 🆘 Issues?

| Problem | Solution |
|---------|----------|
| "ECONNREFUSED" | Check Supabase running in dashboard |
| "SSL error" | Ensure `?sslmode=require` at end of URL |
| "relation not found" | Restart backend (Ctrl+C then `npm run dev`) |
| "invalid password" | Check password special chars in .env |

## 📚 Full Guides
- See `SUPABASE_SETUP.md` for detailed instructions
- See `POSTGRESQL_MIGRATION.md` for technical details

---

**Status**: Ready! 🚀
