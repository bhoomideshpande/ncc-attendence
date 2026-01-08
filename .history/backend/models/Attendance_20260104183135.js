const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');
const Staff = require('./Staff');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  roll: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instituteCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late'),
    allowNull: false,
  },
  markedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Staff,
      key: 'id',
    },
  },
  paradeType: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'attendance',
  timestamps: true,
});

module.exports = Attendance;
  paradeType: {
    type: String,
    enum: ['regular', 'special', 'camp'],
    default: 'regular',
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Attendance', attendanceSchema);