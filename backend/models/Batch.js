const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Batch = sequelize.define('Batch', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instituteId: {
    type: DataTypes.UUID,
    references: {
      model: 'institutes',
      key: 'id',
    },
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
}, {
  tableName: 'batches',
  timestamps: true,
});

module.exports = Batch;
