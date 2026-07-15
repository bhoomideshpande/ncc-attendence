const { Sequelize } = require('sequelize');
require('dotenv').config();

// Allow self-signed certificates globally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Force IPv4
process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: false,
    underscored: true,
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
