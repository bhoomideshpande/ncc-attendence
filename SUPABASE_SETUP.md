# PostgreSQL Supabase Integration Guide

## ✅ Migration Complete!

Your backend has been successfully migrated from MongoDB to PostgreSQL using Sequelize ORM and Supabase.

## 🎯 What Changed

### Database Layer
- **Before**: MongoDB with Mongoose
- **After**: PostgreSQL (Supabase) with Sequelize ORM

### Key Updates
1. ✅ All models converted to Sequelize
2. ✅ All routes updated for SQL operations
3. ✅ Database configuration created
4. ✅ Sequelize sync added to server.js

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Sign in with GitHub or create account
4. Create a new organization
5. Create a new project with these details:
   - **Project Name**: attendance-n-guard
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for testing

6. Wait for project to initialize (2-3 minutes)

### Step 2: Get Connection String

1. Go to **Project Settings** (gear icon bottom left)
2. Click **Database** tab
3. Under "Connection Info" find **Connection String**
4. Click "URI" tab (not "Psql" or "JDBC")
5. Copy the entire connection string

It will look like:
```
postgresql://postgres.abcdefgh:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### Step 3: Update Backend .env

1. Open `backend/.env`
2. Replace the `DATABASE_URL` value with your Supabase connection string
3. Make sure to keep the `?sslmode=require` at the end

Example:
```env
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_ID:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
JWT_SECRET=your-jwt-secret-key
PORT=5001
```

### Step 4: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
PostgreSQL connected successfully!
PostgreSQL database synced
Server running on port 5001
```

✅ If you see these messages, the connection is successful!

## 📊 Database Schema

Supabase automatically creates tables when Sequelize syncs. The tables created are:

### Staff Table
```sql
- id (UUID, Primary Key)
- staffId (String, Unique)
- email (String, Unique)
- password (String, hashed)
- institute (String)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Students Table
```sql
- id (UUID, Primary Key)
- roll (String, Unique)
- firstName (String)
- lastName (String)
- dob (Date)
- gender (ENUM: male, female, other)
- nationality (String)
- address (String)
- phone (String)
- email (String)
- parentName (String)
- instituteCode (String)
- photos (JSON Array)
- status (String: active/inactive)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Attendance Table
```sql
- id (UUID, Primary Key)
- studentId (UUID, Foreign Key → Students)
- roll (String)
- instituteCode (String)
- date (DateTime)
- status (ENUM: present, absent, late)
- markedBy (UUID, Foreign Key → Staff)
- paradeType (String)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Parades Table
```sql
- id (UUID, Primary Key)
- instituteCode (String)
- date (DateTime)
- type (ENUM: regular, special, camp)
- conductedBy (UUID, Foreign Key → Staff)
- totalPresent (Integer)
- totalAbsent (Integer)
- notes (Text)
- attendanceRecords (JSON)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## 🔍 Verify Setup in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Click **SQL Editor** (left sidebar)
3. You should see tables: `staffs`, `students`, `attendance`, `parades`
4. Click on each table to view the schema

Or run this query in SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

## 🧪 Test the Integration

### Register a Staff Member

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "id": "STAFF-001",
    "email": "teacher@example.com",
    "password": "Test@123",
    "institute": "NCC-2024-001"
  }'
```

### Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "Test@123"
  }'
```

You should get back a JWT token!

### Register a Student

```bash
curl -X POST http://localhost:5001/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "NCC202400001",
    "firstName": "John",
    "lastName": "Doe",
    "dob": "2005-01-15",
    "gender": "male",
    "nationality": "Indian",
    "address": "123 Main St",
    "phone": "+919876543210",
    "email": "john@example.com",
    "parentName": "Jane Doe",
    "instituteCode": "NCC-2024-001",
    "photos": [],
    "status": "active"
  }'
```

### Get All Students

```bash
curl http://localhost:5001/api/students
```

## 🔐 Security Best Practices

1. **Never commit .env file** - Keep database credentials private
2. **Strong JWT Secret** - Use a strong random string
3. **SSL Enabled** - Supabase enforces SSL (sslmode=require)
4. **Password Hashing** - All passwords are bcrypt hashed
5. **Connection Pooling** - Supabase handles connection pooling

## 🐛 Troubleshooting

### Connection Error: "connect ECONNREFUSED"
- **Cause**: Wrong connection string or Supabase project not initialized
- **Fix**: 
  1. Check .env DATABASE_URL is correct
  2. Verify Supabase project is running (check dashboard)
  3. Check network connectivity

### SSL Error: "FATAL: SSL connection requires valid client certificate"
- **Cause**: Missing `sslmode=require` in connection string
- **Fix**: Add `?sslmode=require` to the end of DATABASE_URL

### Table Not Found Error
- **Cause**: Sequelize hasn't synced yet
- **Fix**: 
  1. Restart backend with `npm run dev`
  2. Check backend logs for "PostgreSQL database synced"

### Foreign Key Constraint Error
- **Cause**: Trying to reference non-existent staff/student
- **Fix**: Ensure related records exist before creating references

### Authentication Failed
- **Cause**: Wrong email/password or user doesn't exist
- **Fix**: Register user first, then login

## 📈 Performance Tips

1. **Indexing** - Supabase automatically indexes primary/foreign keys
2. **Connection Pooling** - Built into Supabase
3. **Query Optimization** - All routes use efficient queries
4. **Data Types** - Using appropriate PostgreSQL types (UUID, ENUM, JSON)

## 🚢 Deployment

When deploying to production:

1. Use strong `JWT_SECRET` (min 32 characters)
2. Use Supabase production database URL
3. Enable environment-specific .env files
4. Set `NODE_ENV=production`
5. Consider enabling database backups in Supabase

Example production .env:
```env
DATABASE_URL=postgresql://[production-credentials]@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
JWT_SECRET=very-long-and-secure-random-string-here
PORT=5001
NODE_ENV=production
```

## 📚 Sequelize Documentation

- [Sequelize Docs](https://sequelize.org/docs/v6/)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Connection Pooling](https://sequelize.org/docs/v6/other-topics/connection-pool/)

## ✅ Migration Checklist

- [ ] Created Supabase account
- [ ] Created Supabase project
- [ ] Got connection string
- [ ] Updated backend/.env
- [ ] Started backend server
- [ ] Tables created in database
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested student registration
- [ ] Frontend working with backend
- [ ] All API endpoints working

## 🎉 You're All Set!

Your backend is now using PostgreSQL with Supabase. The frontend integration remains the same - no changes needed to the frontend!

### Quick Start Commands

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
npm run dev
```

Visit `http://localhost:5173` to test the application!

---

**Status**: ✅ PostgreSQL + Supabase Integration Complete
**Date**: January 4, 2026
**ORM**: Sequelize
**Database**: PostgreSQL (Supabase)
