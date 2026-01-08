const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Register student
router.post('/register', async (req, res) => {
  try {
    const studentData = req.body;
    const newStudent = await Student.create(studentData);
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll({ where: { status: 'active' } });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get students by institute
router.get('/institute/:instituteCode', async (req, res) => {
  try {
    const { instituteCode } = req.params;
    const students = await Student.findAll({ 
      where: { instituteCode, status: 'active' } 
    });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student by roll
router.get('/roll/:roll', async (req, res) => {
  try {
    const student = await Student.findOne({ where: { roll: req.params.roll } });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.update(req.body);
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete student (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.update({ status: 'inactive' });
    res.json({ message: 'Student deactivated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;