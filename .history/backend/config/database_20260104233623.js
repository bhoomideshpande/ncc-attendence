const { Sequelize } = require('sequelize');
require('dotenv').config();

// Allow self-signed certificates globally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: true,
  },
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully!');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
  }
};

testConnection();

module.exports = sequelize;
