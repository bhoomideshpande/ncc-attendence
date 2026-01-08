# Backend Integration Guide

## Overview
The frontend has been integrated with the Node.js/Express backend. All API calls now use a centralized axios configuration with automatic token management.

## Project Structure

### Frontend
- **src/lib/api.ts** - Centralized axios instance with base URL and auth interceptors
- **src/services/** - API service modules:
  - `auth.ts` - Authentication endpoints (login, register)
  - `student.ts` - Student management endpoints
  - `attendance.ts` - Attendance tracking endpoints
  - `parade.ts` - Parade management endpoints

### Backend
- **backend/routes/** - API endpoints
  - `auth.js` - Authentication routes
  - `student.js` - Student CRUD operations
  - `attendance.js` - Attendance marking and reports
  - `parade.js` - Parade management
- **backend/models/** - MongoDB schemas
  - `Staff.js`
  - `Student.js`
  - `Attendance.js`
  - `Parade.js`

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/attendance-n-guard
   JWT_SECRET=your-jwt-secret-key
   PORT=5001
   ```

4. Start MongoDB (if not running):
   ```bash
   mongod
   ```

5. Seed initial data (optional):
   ```bash
   npm run seed
   ```

6. Start backend server:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5001`

### Frontend Setup
1. Navigate to frontend directory (root):
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file (already created):
   ```
   VITE_API_BASE_URL=http://localhost:5001/api
   ```

4. Start frontend dev server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or next available port)

## API Integration

### Authentication Flow
1. User enters credentials on login page
2. Frontend calls `authService.login(email, password)`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage
5. Token is automatically attached to all subsequent requests via axios interceptor

### API Services Usage

```typescript
// Import service
import { studentService } from '@/services/student';

// Use service method
const response = await studentService.getAll();
const students = response.data;
```

### Error Handling
- If request returns 401 (Unauthorized), token is cleared and user is redirected to login
- All services return axios response objects with `.data` property containing actual data
- Errors are caught and logged in each page component

## Database Schema

### Staff Model
- `id` - Unique staff identifier
- `email` - Staff email (unique)
- `password` - Hashed password
- `institute` - Institute code
- `createdAt` - Timestamp

### Student Model
- `roll` - Roll number (unique)
- `firstName`, `lastName` - Name
- `dob` - Date of birth
- `gender` - Gender
- `nationality` - Nationality
- `address` - Address
- `phone` - Phone number
- `email` - Email
- `parentName` - Parent name
- `instituteCode` - Institute code
- `photos` - Array of photo URLs
- `status` - active/inactive

### Attendance Model
- `studentId` - Reference to Student
- `roll` - Roll number
- `instituteCode` - Institute code
- `date` - Attendance date
- `status` - present/absent
- `markedBy` - Staff ID who marked
- `paradeType` - Type of parade

### Parade Model
- `instituteCode` - Institute code
- `date` - Parade date
- `type` - Parade type
- `totalPresent` - Count of present
- `totalAbsent` - Count of absent
- `attendanceRecords` - Array of attendance records

## Updated Pages

### Login Pages
- **Login.tsx** - Staff login with backend validation
- **AdminLogin.tsx** - Admin login with backend validation
- **Register.tsx** - Staff registration with backend API

### Dashboard Pages
- **Dashboard.tsx** - Fetches real student count and today's attendance
- **Students.tsx** - Lists all students from database
- **NewStudent.tsx** - Registers new student to database

## Token Management
- Tokens are stored in `localStorage` under key `token`
- Tokens expire after 1 hour (configurable in backend)
- Expired tokens trigger automatic redirect to login
- Clear token on logout by removing from localStorage

## Environment Variables

### Frontend (.env.local)
- `VITE_API_BASE_URL` - Base URL for API calls (default: http://localhost:5001/api)

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5001)

## Troubleshooting

### CORS Issues
- Backend has CORS enabled for all origins
- If issues persist, check backend server is running on correct port

### MongoDB Connection
- Ensure MongoDB is running locally
- Check connection string in backend .env file
- Verify database name matches

### Token Errors
- Clear browser localStorage if token becomes invalid
- Restart frontend and backend
- Regenerate JWT_SECRET if needed

### API Not Found
- Verify backend is running on port 5001
- Check API endpoint URLs in services match backend routes
- Use browser DevTools Network tab to inspect requests

## Running Both Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

Both servers will run simultaneously. The frontend will make requests to the backend API.

## Next Steps

1. Test all authentication flows
2. Verify student registration
3. Test attendance marking
4. Implement remaining pages integration
5. Add error boundary components
6. Implement proper loading states

