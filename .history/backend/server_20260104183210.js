const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import models
const Staff = require('./models/Staff');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');
const Parade = require('./models/Parade');

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');
const paradeRoutes = require('./routes/parade');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log('PostgreSQL database synced'))
  .catch(err => console.error('Database sync error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/parades', paradeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});