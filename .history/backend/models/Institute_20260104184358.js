const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Institute = sequelize.define('Institute', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
  },
  battalion: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING,
  },
  totalCadets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
}, {
  tableName: 'institutes',
  timestamps: true,
});

module.exports = Institute;
