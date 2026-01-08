# 🎖️ NCC Attendance & Guard System - Setup & Login Guide

## 📋 Overview

This document provides complete instructions for logging in with staff and admin credentials across 8 military institutes in the NCC Attendance Management System.

---

## 🚀 Quick Start

### Step 1: Start Backend Server
```bash
cd backend
npm start
```
Expected output:
```
Server running on port 5001
PostgreSQL connected successfully!
PostgreSQL database synced
```

### Step 2: Seed Database with Credentials
In a new terminal:
```bash
node seed-credentials.js
```

Or use curl:
```bash
curl -X POST http://localhost:5001/api/admin/seed-full \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Step 3: Start Frontend
```bash
npm run dev
```

### Step 4: Login
Go to: `http://localhost:8081/login`

---

## 🏢 Institute Login Credentials

All credentials are organized institute-wise. Use the table below:

| Institute | Code | Admin Email | Admin Pass | Officer Email | Officer Pass |
|-----------|------|-------------|-----------|---------------|------------|
| NDA (Pune) | NDA | admin.nda@ncc.com | admin@123 | officer1.nda@ncc.com | officer@123 |
| IMA (Dehradun) | IMA | admin.ima@ncc.com | admin@123 | officer1.ima@ncc.com | officer@123 |
| IAF (Hyderabad) | IAF | admin.iaf@ncc.com | admin@123 | officer1.iaf@ncc.com | officer@123 |
| INS (Kerala) | INS | admin.ins@ncc.com | admin@123 | officer1.ins@ncc.com | officer@123 |
| RIMC (Dehradun) | RIMC | admin.rimc@ncc.com | admin@123 | officer1.rimc@ncc.com | officer@123 |
| KLE Tech (Hubli) | KLE_TECH | admin.kle@ncc.com | admin@123 | officer1.kle@ncc.com | officer@123 |
| PC Jabin (Hubli) | PC_JABIN | admin.pcjabin@ncc.com | admin@123 | officer1.pcjabin@ncc.com | officer@123 |
| SVSB (Saundatti) | SVSB | admin.svsb@ncc.com | admin@123 | officer1.svsb@ncc.com | officer@123 |

---

## 📌 Key Credentials Reference

### Admin Credentials (Same password for all)
```
NDA       → admin.nda@ncc.com          / admin@123
IMA       → admin.ima@ncc.com          / admin@123
IAF       → admin.iaf@ncc.com          / admin@123
INS       → admin.ins@ncc.com          / admin@123
RIMC      → admin.rimc@ncc.com         / admin@123
KLE_TECH  → admin.kle@ncc.com          / admin@123
PC_JABIN  → admin.pcjabin@ncc.com      / admin@123
SVSB      → admin.svsb@ncc.com         / admin@123
```

### Officer Credentials (Same password for all)
```
NDA       → officer1.nda@ncc.com       / officer@123
IMA       → officer1.ima@ncc.com       / officer@123
IAF       → officer1.iaf@ncc.com       / officer@123
INS       → officer1.ins@ncc.com       / officer@123
RIMC      → officer1.rimc@ncc.com      / officer@123
KLE_TECH  → officer1.kle@ncc.com       / officer@123
PC_JABIN  → officer1.pcjabin@ncc.com   / officer@123
SVSB      → officer1.svsb@ncc.com      / officer@123
```

---

## 🔐 Password Policy

- **Admin Password**: `admin@123` (all admins)
- **Officer Password**: `officer@123` (all officers)
- **Hashing**: bcryptjs (10 salt rounds)
- **Token Expiry**: 1 hour
- **Re-login**: Required after token expiration

---

## 🌐 Frontend Access

### Login Page
```
http://localhost:8081/login
```
✓ Use any email from credentials table above

### Staff Dashboard
```
http://localhost:8081/dashboard
```
✓ View attendance, students, reports for your institute

### Admin Dashboard
```
http://localhost:8081/admin/dashboard
```
✓ Manage all institutes, view statistics

### Reports
```
http://localhost:8081/reports
```
✓ Filter by institute, batch, period
✓ Download CSV reports

### Students
```
http://localhost:8081/students
```
✓ View all students
✓ Register new students
✓ Update student details

---

## 🔌 API Testing

### Test Login Endpoint
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin.nda@ncc.com",
    "password": "admin@123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "staff": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin.nda@ncc.com",
    "institute": "NDA"
  }
}
```

### Get All Institutes
```bash
TOKEN="<your_token_from_login>"
curl http://localhost:5001/api/institutes \
  -H "Authorization: Bearer $TOKEN"
```

### Get Institute Report
```bash
curl http://localhost:5001/api/analytics/institute/NDA \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Testing Scenarios

### Scenario 1: Admin Login & Dashboard
1. Go to login page: `http://localhost:8081/login`
2. Enter: `admin.nda@ncc.com` / `admin@123`
3. View admin dashboard at: `/admin/dashboard`
4. See all institutes, statistics

### Scenario 2: Officer Login & Mark Attendance
1. Go to login page: `http://localhost:8081/login`
2. Enter: `officer1.nda@ncc.com` / `officer@123`
3. View staff dashboard at: `/dashboard`
4. Mark attendance for students

### Scenario 3: View Reports
1. Login with any credentials
2. Go to `/reports`
3. Filter by institute, batch, period
4. Download CSV report

### Scenario 4: Register New Student
1. Login with any credentials
2. Go to `/students` → "New Student"
3. Fill form with student details
4. Select institute and batch
5. Save student record

---

## 📊 Database Schema

### Staff Table
```
id: UUID (primary key)
staffId: String (unique, e.g., "NDA-ADM-001")
email: String (unique, e.g., "admin.nda@ncc.com")
password: String (hashed with bcryptjs)
institute: String (e.g., "NDA")
createdAt: Timestamp
updatedAt: Timestamp
```

### Institute Table
```
id: UUID (primary key)
code: String (unique, e.g., "NDA")
name: String (e.g., "National Defence Academy")
shortName: String (e.g., "NDA")
battalion: String (e.g., "Pioneer")
logo: String (URL)
city: String (e.g., "Pune")
totalCadets: Integer
status: String (e.g., "active")
```

---

## 📁 Reference Files

See these files in the project root for more details:

1. **LOGIN_CREDENTIALS.md** - Detailed credentials with all tables
2. **TEST_REQUESTS.md** - cURL examples for API testing
3. **CREDENTIALS_QUICK_REFERENCE.txt** - ASCII art reference
4. **credentials.json** - Machine-readable format
5. **seed-credentials.js** - Node script to seed database

---

## ✅ Verification Checklist

Before reporting issues, verify:

- [ ] Backend server is running (`npm start`)
- [ ] Database is synced (see console output)
- [ ] Seed endpoint was called (`/api/admin/seed-full`)
- [ ] Frontend is running (`npm run dev`)
- [ ] You can see login page at `http://localhost:8081/login`
- [ ] You can login with provided credentials
- [ ] Dashboard loads after login
- [ ] You can view institutes/students/reports

---

## 🐛 Troubleshooting

### Login fails with "Invalid email or password"
**Solution**: Ensure you've run the seed endpoint first
```bash
node seed-credentials.js
```

### Can't find institute in dropdown
**Solution**: Check if seed was successful, look at database via:
```bash
curl http://localhost:5001/api/institutes \
  -H "Authorization: Bearer <token>"
```

### Token expired error
**Solution**: Login again - tokens expire in 1 hour
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin.nda@ncc.com","password":"admin@123"}'
```

### Backend won't start
**Solution**: Check if port 5001 is in use
```bash
netstat -ano | findstr :5001  # Windows
lsof -i :5001                 # macOS/Linux
```

### Frontend doesn't load
**Solution**: Check if port 8081 is available, try:
```bash
npm run dev -- --port 8082
```

---

## 🔄 Workflow Example

### Complete Login Flow

```
1. User opens: http://localhost:8081/login

2. User enters credentials:
   Email: admin.nda@ncc.com
   Password: admin@123

3. Frontend sends POST to: http://localhost:5001/api/auth/login
   Body: { "email": "admin.nda@ncc.com", "password": "admin@123" }

4. Backend verifies:
   - Finds staff by email
   - Compares password with bcrypt
   - Generates JWT token

5. Backend responds with token and staff info

6. Frontend stores token in localStorage

7. Frontend redirects to: http://localhost:8081/dashboard

8. Dashboard fetches data using Authorization header:
   Authorization: Bearer <token>

9. Backend validates token and returns data

10. Dashboard displays staff's institute information
```

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review TEST_REQUESTS.md for API examples
3. Check backend console for error messages
4. Verify database connection to Supabase

---

## 📝 Notes

- All staff members can mark attendance and view reports
- Admins can manage their institute's staff and students
- System supports 8 military institutes out-of-the-box
- Easy to add more institutes or staff via API
- All data is encrypted and hashed for security

---

**Last Updated**: January 4, 2026
**System**: NCC Attendance & Guard - 28 Karnataka Battalion
**Version**: 1.0.0
