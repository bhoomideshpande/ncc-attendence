# Integration Testing Checklist

## Pre-Flight Checks
- [ ] MongoDB is running locally
- [ ] Backend `.env` file is configured
- [ ] Frontend `.env.local` file exists
- [ ] Both `node_modules` directories are installed

## Backend Startup (Terminal 1)
```bash
cd backend
npm run dev
```
- [ ] Backend starts without errors
- [ ] MongoDB connection successful: "MongoDB connected"
- [ ] Server listening: "Server running on port 5001"
- [ ] No CORS errors

## Frontend Startup (Terminal 2)
```bash
npm run dev
```
- [ ] Vite dev server starts
- [ ] No API configuration errors
- [ ] Port 5173 available (or next available port)

## Authentication Testing

### Staff Login
1. Navigate to `http://localhost:5173/login`
2. [ ] Page loads with NCC logo
3. [ ] Enter test credentials:
   - Email: test@example.com
   - Password: test123
4. [ ] Click "Login"
5. [ ] Success toast message appears
6. [ ] Redirected to dashboard
7. [ ] JWT token stored in localStorage

### Staff Registration
1. Navigate to `http://localhost:5173/register`
2. [ ] Form displays all fields
3. [ ] Fill in test data:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Phone: +919876543210
   - Institute Code: NCC-2024-001
   - Password: Test@123
   - Confirm Password: Test@123
4. [ ] Submit form
5. [ ] Success message appears
6. [ ] Redirected to login page
7. [ ] Can login with new credentials

### Admin Login
1. Navigate to `http://localhost:5173/admin-login`
2. [ ] Page displays orange theme
3. [ ] Enter admin credentials
4. [ ] Token stored with `userRole: admin`
5. [ ] Redirected to admin dashboard

## Student Management Testing

### Add New Student
1. Navigate to `http://localhost:5173/students/new`
2. [ ] Multi-step form renders correctly
3. **Step 1**: Enter student details
   - [ ] First Name: Required field
   - [ ] Last Name: Required field
   - [ ] DOB: Required field
   - [ ] Gender: Required field
   - [ ] Proceed to next step
4. **Step 2**: Upload photos
   - [ ] Upload image file
   - [ ] Image preview shows
   - [ ] Maximum 3 photos enforced
   - [ ] Proceed to next step
5. **Step 3**: Review and submit
   - [ ] All data displays correctly
   - [ ] Submit button works
   - [ ] Success message appears
   - [ ] Redirected to students list

### View Students List
1. Navigate to `http://localhost:5173/students`
2. [ ] Page loads and displays students table
3. [ ] Table shows columns: Roll No, Name, Institute, Status, Actions
4. [ ] Student count displays correctly
5. [ ] Search functionality works
6. [ ] Delete button removes student
7. [ ] Status updates to "inactive"

## Dashboard Testing
1. Navigate to `http://localhost:5173/dashboard/<staffId>`
2. [ ] Dashboard loads successfully
3. [ ] Total Students count displays (should match database)
4. [ ] Today's Attendance count displays
5. [ ] Quick action buttons are clickable
6. [ ] Navigation works (Add Student, View Reports)

## Network Testing (DevTools)

### Check Network Requests
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform login action
4. [ ] POST request to `/api/auth/login`
5. [ ] Response includes `token` field
6. [ ] Status code is 200
7. [ ] Token appears in request headers for subsequent requests

### Check Storage
1. Open DevTools Application tab
2. LocalStorage section
3. [ ] `token` key exists after login
4. [ ] Token value is JWT (contains 3 dots)
5. [ ] `userRole` key exists if admin login tested

## Error Handling Testing

### Invalid Login
1. Navigate to login page
2. [ ] Enter wrong email/password
3. [ ] Error toast shows: "Invalid email or password"
4. [ ] User stays on login page
5. [ ] No token stored

### Network Error
1. Stop backend server
2. [ ] Try to perform any API action
3. [ ] Error toast appears
4. [ ] No crash or infinite loading

### 401 Unauthorized
1. Manually remove token from localStorage
2. [ ] Refresh page
3. [ ] Should be redirected to login

## Database Verification

### MongoDB Check
```bash
# In MongoDB shell
use attendance-n-guard
db.staff.find()        # Should show registered staff
db.students.find()     # Should show registered students
```
- [ ] Staff records created on registration
- [ ] Student records created on student registration
- [ ] Passwords are hashed (not plain text)

## Performance Testing

### Page Load Times
- [ ] Login page loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds
- [ ] Students list loads in < 3 seconds

### API Response Times
- [ ] Login response in < 1 second
- [ ] Student list in < 2 seconds
- [ ] No timeouts on API calls

## Clean State Testing

### Clear and Restart
1. Delete `.env.local` and recreate
2. Clear browser localStorage
3. [ ] Application still works
4. [ ] API URLs correct
5. [ ] Login flow works fresh

## Final Checklist

- [ ] All pages load without 404 errors
- [ ] All API calls use service layer
- [ ] No hardcoded URLs in components
- [ ] Error messages display properly
- [ ] Token management works correctly
- [ ] Navigation works between pages
- [ ] Mobile responsiveness maintained
- [ ] No console errors
- [ ] No network errors (200-299 status)

## Common Issues & Solutions

### CORS Error
**Problem**: "Access to XMLHttpRequest blocked by CORS"
**Solution**: Ensure backend `cors()` middleware is enabled

### Token Not Sent
**Problem**: Backend returns 401 on protected routes
**Solution**: Check interceptor in `src/lib/api.ts`

### API 404
**Problem**: "Cannot POST /api/auth/login"
**Solution**: Verify backend route exists and port is 5001

### MongoDB Connection
**Problem**: "MongoDB connection error"
**Solution**: 
- Start MongoDB: `mongod`
- Check connection string in backend `.env`
- Verify `attendance-n-guard` database exists

---

**Status**: Ready for Testing
**Last Updated**: January 4, 2026
