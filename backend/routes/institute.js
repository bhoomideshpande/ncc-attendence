const express = require('express');
const Institute = require('../models/Institute');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const { Op } = require('sequelize');

const router = express.Router();

// Get all institutes
router.get('/', async (req, res) => {
  try {
    const institutes = await Institute.findAll({ where: { status: 'active' } });
    res.json(institutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get institute by ID
router.get('/:id', async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.json(institute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new institute
router.post('/', async (req, res) => {
  try {
    const { code, name, shortName, battalion, logo, city } = req.body;
    const institute = await Institute.create({
      code,
      name,
      shortName,
      battalion,
      logo,
      city,
    });
    res.status(201).json({ message: 'Institute created', institute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update institute
router.put('/:id', async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    await institute.update(req.body);
    res.json({ message: 'Institute updated', institute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get institute statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    const institute = await Institute.findByPk(id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    // Get students count
    const students = await Student.findAll({
      where: { instituteCode: institute.code, status: 'active' },
    });

    // Get today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await Attendance.findAll({
      where: {
        instituteCode: institute.code,
        date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });

    const presentCount = todayAttendance.filter(a => a.status === 'present').length;
    const absentCount = todayAttendance.filter(a => a.status === 'absent').length;

    res.json({
      institute,
      totalStudents: students.length,
      todayAttendance: todayAttendance.length,
      presentCount,
      absentCount,
      attendanceRate: students.length > 0 
        ? ((presentCount / students.length) * 100).toFixed(2)
        : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
