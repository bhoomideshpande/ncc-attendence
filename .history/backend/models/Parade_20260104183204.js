const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Staff = require('./Staff');

const Parade = sequelize.define('Parade', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  instituteCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('regular', 'special', 'camp'),
    defaultValue: 'regular',
  },
  conductedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Staff,
      key: 'id',
    },
  },
  totalPresent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalAbsent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  attendanceRecords: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  tableName: 'parades',
  timestamps: true,
});

module.exports = Parade;