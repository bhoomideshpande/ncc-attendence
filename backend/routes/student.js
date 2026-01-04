const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Register student
router.post('/register', async (req, res) => {
  try {
    const studentData = req.body;
    const newStudent = new Student(studentData);
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Student with this roll number already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ status: 'active' });
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
    const students = await Student.find({ instituteCode, status: 'active' });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student by roll
router.get('/roll/:roll', async (req, res) => {
  try {
    const student = await Student.findOne({ roll: req.params.roll });
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
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete student (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deactivated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;