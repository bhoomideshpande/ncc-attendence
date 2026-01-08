const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find staff by email
    const staff = await Staff.findOne({ where: { email } });
    if (!staff) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: staff.id, staffId: staff.staffId, email: staff.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      staff: {
        id: staff.id,
        email: staff.email,
        institute: staff.institute,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register staff (for admin use)
router.post('/register', async (req, res) => {
  try {
    const { id, email, password, institute } = req.body;

    // Check if staff already exists
    const existingStaff = await Staff.findOne({
      where: {
        email,
      },
    });
    if (existingStaff) {
      return res.status(400).json({ message: 'Staff with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new staff
    const newStaff = await Staff.create({
      staffId: id || `STAFF-${Date.now()}`,
      email,
      password: hashedPassword,
      institute,
    });

    res.status(201).json({ message: 'Staff registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

module.exports = router;