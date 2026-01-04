const mongoose = require('mongoose');

const paradeSchema = new mongoose.Schema({
  instituteCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['regular', 'special', 'camp'],
    default: 'regular',
  },
  conductedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  totalPresent: {
    type: Number,
    default: 0,
  },
  totalAbsent: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  attendanceRecords: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    roll: String,
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Parade', paradeSchema);