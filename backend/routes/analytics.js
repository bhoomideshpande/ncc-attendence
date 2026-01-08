const express = require('express');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Institute = require('../models/Institute');
const { Op } = require('sequelize');

const router = express.Router();

// Get attendance report for institute
router.get('/institute/:instituteCode', async (req, res) => {
  try {
    const { instituteCode } = req.params;
    const { startDate, endDate, period } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        date: {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate),
        },
      };
    } else if (period === 'monthly') {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = {
        date: {
          [Op.gte]: firstDay,
          [Op.lte]: now,
        },
      };
    } else if (period === 'weekly') {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = {
        date: {
          [Op.gte]: weekAgo,
          [Op.lte]: now,
        },
      };
    }

    const attendance = await Attendance.findAll({
      where: {
        instituteCode,
        ...dateFilter,
      },
    });

    // Group by student
    const report = {};
    attendance.forEach(record => {
      const roll = record.roll;
      if (!report[roll]) {
        report[roll] = {
          roll,
          studentId: record.studentId,
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

// Get student absence report
router.get('/student/:studentId/absences', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { limit } = req.query;

    const attendance = await Attendance.findAll({
      where: {
        studentId,
        status: 'absent',
      },
      order: [['date', 'DESC']],
      limit: limit ? parseInt(limit) : 100,
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get institute batch-wise report
router.get('/institute/:instituteCode/batches', async (req, res) => {
  try {
    const { instituteCode } = req.params;

    // Get all students with their batch
    const students = await Student.findAll({
      where: { instituteCode, status: 'active' },
    });

    // Group by batch
    const batchReport = {};
    students.forEach(student => {
      const batchInfo = student.dob ? new Date(student.dob).getFullYear() : 'unknown';
      if (!batchReport[batchInfo]) {
        batchReport[batchInfo] = [];
      }
      batchReport[batchInfo].push(student);
    });

    res.json(batchReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance statistics for period
router.get('/stats/period', async (req, res) => {
  try {
    const { instituteCode, period } = req.query;

    let startDate, endDate;
    const now = new Date();

    if (period === 'weekly') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      endDate = now;
    } else if (period === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = now;
    } else if (period === 'quarterly') {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      endDate = now;
    } else if (period === 'yearly') {
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = now;
    }

    const attendance = await Attendance.findAll({
      where: {
        ...(instituteCode && { instituteCode }),
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;

    res.json({
      period,
      startDate,
      endDate,
      total,
      present,
      absent,
      late,
      attendancePercentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
      parades: total > 0 ? Math.ceil(total / 50) : 0, // Approximate parades
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top absent students
router.get('/students/absent/top', async (req, res) => {
  try {
    const { instituteCode, limit } = req.query;

    const attendance = await Attendance.findAll({
      where: {
        status: 'absent',
        ...(instituteCode && { instituteCode }),
      },
    });

    // Group by student and count absences
    const absentCount = {};
    attendance.forEach(record => {
      if (!absentCount[record.roll]) {
        absentCount[record.roll] = {
          roll: record.roll,
          studentId: record.studentId,
          absents: 0,
        };
      }
      absentCount[record.roll].absents++;
    });

    // Sort and limit
    const sorted = Object.values(absentCount)
      .sort((a, b) => b.absents - a.absents)
      .slice(0, limit ? parseInt(limit) : 20);

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
