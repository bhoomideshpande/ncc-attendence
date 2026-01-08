# NCC Attendance System - Test Requests

## Setup Instructions

### 1. Seed Database with Credentials
**Endpoint**: `POST http://localhost:5001/api/admin/seed-full`

**Request**:
```bash
curl -X POST http://localhost:5001/api/admin/seed-full \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response** (200 OK):
```json
{
  "message": "Database seeded successfully",
  "credentials": {
    "note": "All passwords are: admin@123 for admins and officer@123 for staff",
    "adminLogins": {
      "NDA": {
        "institute": "National Defence Academy",
        "email": "admin.nda@ncc.com",
        "password": "admin@123",
        "staffId": "NDA-ADM-001"
      }
      // ... more institutes
    },
    "staffLogins": {
      "NDA": {
        "institute": "National Defence Academy",
        "email": "officer1.nda@ncc.com",
        "password": "officer@123",
        "staffId": "NDA-STAFF-001"
      }
      // ... more institutes
    }
  }
}
```

---

## Auth Endpoints

### Login with Admin Credentials
**Endpoint**: `POST http://localhost:5001/api/auth/login`

**Request**:
```json
{
  "email": "admin.nda@ncc.com",
  "password": "admin@123"
}
```

**Expected Response** (200 OK):
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

---

### Login with Staff Credentials
**Endpoint**: `POST http://localhost:5001/api/auth/login`

**Request**:
```json
{
  "email": "officer1.nda@ncc.com",
  "password": "officer@123"
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "staff": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "email": "officer1.nda@ncc.com",
    "institute": "NDA"
  }
}
```

---

## Institute Endpoints

### Get All Institutes
**Endpoint**: `GET http://localhost:5001/api/institutes`

**Headers**:
```
Authorization: Bearer <token_from_login>
```

**Expected Response** (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "NDA",
    "name": "National Defence Academy",
    "shortName": "NDA",
    "battalion": "Pioneer",
    "logo": "https://via.placeholder.com/50",
    "city": "Pune",
    "totalCadets": 450,
    "status": "active",
    "createdAt": "2026-01-04T10:00:00.000Z",
    "updatedAt": "2026-01-04T10:00:00.000Z"
  },
  // ... more institutes
]
```

---

### Get Institute Stats
**Endpoint**: `GET http://localhost:5001/api/institutes/NDA/stats`

**Headers**:
```
Authorization: Bearer <token_from_login>
```

**Expected Response** (200 OK):
```json
{
  "totalStudents": 42,
  "todayAttendance": 38,
  "presentCount": 38,
  "absentCount": 4,
  "attendanceRate": "90.48%"
}
```

---

## Analytics Endpoints

### Get Institute Attendance Report
**Endpoint**: `GET http://localhost:5001/api/analytics/institute/NDA`

**Query Parameters**:
- `startDate`: (optional) YYYY-MM-DD
- `endDate`: (optional) YYYY-MM-DD

**Headers**:
```
Authorization: Bearer <token_from_login>
```

**Expected Response** (200 OK):
```json
[
  {
    "studentId": "550e8400-e29b-41d4-a716-446655440100",
    "studentName": "John Doe",
    "roll": "NCC2025001",
    "presentCount": 18,
    "absentCount": 0,
    "lateCount": 2,
    "attendanceRate": "100%"
  },
  // ... more students
]
```

---

### Get Top Absent Students
**Endpoint**: `GET http://localhost:5001/api/analytics/students/absent/top`

**Query Parameters**:
- `limit`: (optional, default: 10)
- `instituteCode`: (optional, filter by institute)

**Headers**:
```
Authorization: Bearer <token_from_login>
```

**Expected Response** (200 OK):
```json
[
  {
    "studentId": "550e8400-e29b-41d4-a716-446655440100",
    "studentName": "Jane Smith",
    "roll": "NCC2025045",
    "institute": "NDA",
    "totalAbsent": 12,
    "attendanceRate": "33%"
  },
  // ... more students
]
```

---

### Get Period Statistics
**Endpoint**: `GET http://localhost:5001/api/analytics/stats/period`

**Query Parameters**:
- `period`: weekly | monthly | quarterly | halfyearly | yearly (default: monthly)
- `instituteCode`: (optional)

**Headers**:
```
Authorization: Bearer <token_from_login>
```

**Expected Response** (200 OK):
```json
{
  "period": "monthly",
  "totalStudents": 450,
  "totalAttendances": 8550,
  "totalAbsences": 450,
  "overallAttendanceRate": "95%",
  "byBatch": {
    "2025": {
      "students": 150,
      "attendanceRate": "96%"
    },
    "2024": {
      "students": 150,
      "attendanceRate": "94%"
    }
  }
}
```

---

## Test Scenarios

### Scenario 1: Admin Login & View Dashboard
```bash
# 1. Login as admin
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin.nda@ncc.com",
    "password": "admin@123"
  }' > token.json

# Extract token and save for next requests
TOKEN=$(jq -r '.token' token.json)

# 2. Get all institutes
curl http://localhost:5001/api/institutes \
  -H "Authorization: Bearer $TOKEN"

# 3. Get institute stats
curl http://localhost:5001/api/institutes/550e8400-e29b-41d4-a716-446655440000/stats \
  -H "Authorization: Bearer $TOKEN"

# 4. Get attendance report
curl http://localhost:5001/api/analytics/institute/NDA \
  -H "Authorization: Bearer $TOKEN"
```

### Scenario 2: Staff Login & Mark Attendance
```bash
# 1. Login as staff
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "officer1.nda@ncc.com",
    "password": "officer@123"
  }' > staff_token.json

TOKEN=$(jq -r '.token' staff_token.json)

# 2. View attendance history
curl http://localhost:5001/api/analytics/institute/NDA \
  -H "Authorization: Bearer $TOKEN"

# 3. View top absent students
curl "http://localhost:5001/api/analytics/students/absent/top?limit=5&instituteCode=NDA" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Credential Summary Sheet

```
┌────────┬──────────────────────┬──────────────┬──────────────────┐
│ Inst.  │ Admin Email          │ Password     │ Officer Email    │
├────────┼──────────────────────┼──────────────┼──────────────────┤
│ NDA    │ admin.nda@ncc.com    │ admin@123    │ officer1.nda@... │
│ IMA    │ admin.ima@ncc.com    │ admin@123    │ officer1.ima@... │
│ IAF    │ admin.iaf@ncc.com    │ admin@123    │ officer1.iaf@... │
│ INS    │ admin.ins@ncc.com    │ admin@123    │ officer1.ins@... │
│ RIMC   │ admin.rimc@ncc.com   │ admin@123    │ officer1.rimc@.. │
│ KLE    │ admin.kle@ncc.com    │ admin@123    │ officer1.kle@... │
│ PC J.  │ admin.pcjabin@...    │ admin@123    │ officer1.pcjab..│
│ SVSB   │ admin.svsb@ncc.com   │ admin@123    │ officer1.svsb@..│
└────────┴──────────────────────┴──────────────┴──────────────────┘
```

---

## Important Notes

1. **Always seed first**: Run `/api/admin/seed-full` before testing login
2. **Token expiry**: Tokens expire in 1 hour - re-login if needed
3. **Institute codes** used in API: NDA, IMA, IAF, INS, RIMC, KLE_TECH, PC_JABIN, SVSB
4. **All passwords are hashed**: bcryptjs with 10 salt rounds
5. **Frontend URLs**: 
   - Login: `http://localhost:8081/login`
   - Admin: `http://localhost:8081/admin/dashboard`
   - Reports: `http://localhost:8081/reports`

---

**Created**: January 4, 2026
**System**: NCC Attendance & Guard - 28 Karnataka Battalion
