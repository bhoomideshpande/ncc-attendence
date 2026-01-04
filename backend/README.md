# Attendance and Guard Backend

## Setup

1. **MongoDB Setup:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster
   - Get your connection string
   - Update `backend/.env` with your `MONGODB_URI`

2. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Seed Database:**
   ```bash
   npm run seed
   ```

4. **Run Backend:**
   ```bash
   npm run dev
   ```

5. **Run Frontend:**
   ```bash
   cd ..
   npm run dev
   ```

## API Endpoints

- POST /api/auth/login - Staff login
- POST /api/auth/register - Register new staff (admin use)