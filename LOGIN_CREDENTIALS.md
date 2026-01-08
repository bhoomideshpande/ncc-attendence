# NCC Attendance & Guard System - Login Credentials

## Overview
This document contains all valid login credentials for the NCC Attendance Management System organized by institute.

---

## How to Seed Credentials

To populate all institutes and staff credentials into the database, call this endpoint:

```bash
POST http://localhost:5001/api/admin/seed-full
```

This will create 8 institutes with 2-3 staff members each (admin + officers).

---

## Admin Credentials by Institute

### 1. NDA (National Defence Academy) - Pune
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.nda@ncc.com | admin@123 | NDA-ADM-001 |

### 2. IMA (Indian Military Academy) - Dehradun
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.ima@ncc.com | admin@123 | IMA-ADM-001 |

### 3. IAF (Indian Air Force Academy) - Hyderabad
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.iaf@ncc.com | admin@123 | IAF-ADM-001 |

### 4. INS (Indian Naval Academy) - Kerala
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.ins@ncc.com | admin@123 | INS-ADM-001 |

### 5. RIMC (Rashtriya Indian Military College) - Dehradun
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.rimc@ncc.com | admin@123 | RIMC-ADM-001 |

### 6. KLE Tech (KLE Technological University) - Hubli
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.kle@ncc.com | admin@123 | KLE_TECH-ADM-001 |

### 7. PC Jabin (PC Jabin College) - Hubli
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.pcjabin@ncc.com | admin@123 | PC_JABIN-ADM-001 |

### 8. SVSB (SVSB College) - Saundatti
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Admin** | admin.svsb@ncc.com | admin@123 | SVSB-ADM-001 |

---

## Staff Credentials by Institute

### 1. NDA (National Defence Academy) - Pune
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.nda@ncc.com | officer@123 | NDA-STAFF-001 |
| **Officer 2** | officer2.nda@ncc.com | officer@123 | NDA-STAFF-002 |

### 2. IMA (Indian Military Academy) - Dehradun
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.ima@ncc.com | officer@123 | IMA-STAFF-001 |
| **Officer 2** | officer2.ima@ncc.com | officer@123 | IMA-STAFF-002 |

### 3. IAF (Indian Air Force Academy) - Hyderabad
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.iaf@ncc.com | officer@123 | IAF-STAFF-001 |

### 4. INS (Indian Naval Academy) - Kerala
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.ins@ncc.com | officer@123 | INS-STAFF-001 |

### 5. RIMC (Rashtriya Indian Military College) - Dehradun
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.rimc@ncc.com | officer@123 | RIMC-STAFF-001 |

### 6. KLE Tech (KLE Technological University) - Hubli
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.kle@ncc.com | officer@123 | KLE_TECH-STAFF-001 |

### 7. PC Jabin (PC Jabin College) - Hubli
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.pcjabin@ncc.com | officer@123 | PC_JABIN-STAFF-001 |

### 8. SVSB (SVSB College) - Saundatti
| Role | Email | Password | Staff ID |
|------|-------|----------|----------|
| **Officer 1** | officer1.svsb@ncc.com | officer@123 | SVSB-STAFF-001 |

---

## Quick Reference Table

### All Admin Logins (Institute-wise)
```
NDA     → admin.nda@ncc.com          / admin@123
IMA     → admin.ima@ncc.com          / admin@123
IAF     → admin.iaf@ncc.com          / admin@123
INS     → admin.ins@ncc.com          / admin@123
RIMC    → admin.rimc@ncc.com         / admin@123
KLE Tech → admin.kle@ncc.com          / admin@123
PC Jabin → admin.pcjabin@ncc.com      / admin@123
SVSB    → admin.svsb@ncc.com         / admin@123
```

### All Officer Logins (Institute-wise)
```
NDA     → officer1.nda@ncc.com       / officer@123
        → officer2.nda@ncc.com       / officer@123

IMA     → officer1.ima@ncc.com       / officer@123
        → officer2.ima@ncc.com       / officer@123

IAF     → officer1.iaf@ncc.com       / officer@123
INS     → officer1.ins@ncc.com       / officer@123
RIMC    → officer1.rimc@ncc.com      / officer@123
KLE Tech → officer1.kle@ncc.com       / officer@123
PC Jabin → officer1.pcjabin@ncc.com   / officer@123
SVSB    → officer1.svsb@ncc.com      / officer@123
```

---

## How to Test Login

### Using Frontend
1. Go to Staff Login: `http://localhost:8081/login`
2. Enter any email from the credentials above
3. Enter the corresponding password
4. Click Login

### Using API (cURL)
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin.nda@ncc.com",
    "password": "admin@123"
  }'
```

### Response Example
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "staff": {
    "id": "uuid-here",
    "email": "admin.nda@ncc.com",
    "institute": "NDA"
  }
}
```

---

## Notes

- **Password Format**: All passwords are already hashed using bcryptjs in the database
- **Token Expiry**: JWT tokens expire in 1 hour
- **Institute Code**: Used in API calls like `/api/analytics/institute/NDA`
- **Default Permissions**: All staff can mark attendance and view reports
- **Add More Users**: Use `/api/auth/register` endpoint to add more staff members

---

## Important - First Time Setup

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Seed Database**:
   ```bash
   curl -X POST http://localhost:5001/api/admin/seed-full
   ```

3. **Start Frontend**:
   ```bash
   npm run dev
   ```

4. **Login**: Use any credentials from tables above

---

## Troubleshooting

**Q: Login fails with "Invalid email or password"**
- A: Make sure you've run the seed endpoint first: `POST /api/admin/seed-full`

**Q: Can't find my institute?**
- A: It needs to be created first. Run the seed endpoint above.

**Q: Want to add more staff?**
- A: Use `POST /api/auth/register` with email, password, and institute code

**Q: Forgot password?**
- A: Update `backend/routes/admin.js` with new staff data and re-run seed

---

**Last Updated**: January 4, 2026
**System**: NCC Attendance & Guard - 28 Karnataka Battalion
