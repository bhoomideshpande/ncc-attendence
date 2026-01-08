const express = require('express');
const Attendance = require('../models/Attendance');
const Parade = require('../models/Parade');
const Student = require('../models/Student');
const { Op } = require('sequelize');

const router = express.Router();

// Mark attendance for a parade
router.post('/mark', async (req, res) => {
  try {
    const { paradeId, attendanceRecords } = req.body;

    // Save individual attendance records
    const savedRecords = [];
    for (const record of attendanceRecords) {
      const attendance = await Attendance.create({
        studentId: record.studentId,
        roll: record.roll,
        instituteCode: record.instituteCode,
        date: new Date(),
        status: record.status,
        markedBy: record.markedBy,
        paradeType: record.paradeType,
      });
      savedRecords.push(attendance);
    }

    // Update parade with attendance summary
    const parade = await Parade.findByPk(paradeId);
    if (parade) {
      await parade.update({
        totalPresent: attendanceRecords.filter(r => r.status === 'present').length,
        totalAbsent: attendanceRecords.filter(r => r.status === 'absent').length,
        attendanceRecords: savedRecords.map(r => ({
          studentId: r.studentId,
          roll: r.roll,
          status: r.status,
        })),
      });
    }

    res.json({ message: 'Attendance marked successfully', records: savedRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      where: { studentId: req.params.studentId },
      order: [['date', 'DESC']],
    });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for an institute on a date
router.get('/institute/:instituteCode/:date', async (req, res) => {
  try {
    const { instituteCode, date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const attendance = await Attendance.findAll({
      where: {
        instituteCode,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance report for institute
router.get('/report/:instituteCode', async (req, res) => {
  try {
    const { instituteCode } = req.params;
    const { startDate, endDate } = req.query;

    const where = { instituteCode };
    if (startDate && endDate) {
      where.date = {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate),
      };
    }

    const attendance = await Attendance.findAll({ where });

    // Group by student
    const report = {};
    attendance.forEach(record => {
      const roll = record.roll;
      if (!report[roll]) {
        report[roll] = {
          student: record.studentId,
          totalPresent: 0,
          totalAbsent: 0,
          totalLate: 0,
          records: []
        };
      }
      report[roll].records.push(record);
      if (record.status === 'present') report[roll].totalPresent++;
      else if (record.status === 'absent') report[roll].totalAbsent++;
      else if (record.status === 'late') report[roll].totalLate++;
    });

    res.json(Object.values(report));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

module.exports = router;