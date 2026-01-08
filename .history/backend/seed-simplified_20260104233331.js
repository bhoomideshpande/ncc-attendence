const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const Institute = require('./models/Institute');
const Staff = require('./models/Staff');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Database connected');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('✓ Database tables synced');

    // Seed institutes
    const institutes = [
      {
        code: 'NDA',
        name: 'National Defence Academy',
        shortName: 'NDA',
        battalion: 'Pioneer',
        logo: 'https://via.placeholder.com/50',
        city: 'Pune',
        totalCadets: 450,
        status: 'active',
      },
      {
        code: 'IMA',
        name: 'Indian Military Academy',
        shortName: 'IMA',
        battalion: 'Dehra Dun',
        logo: 'https://via.placeholder.com/50',
        city: 'Dehradun',
        totalCadets: 350,
        status: 'active',
      },
    ];

    for (const instituteData of institutes) {
      const existing = await Institute.findOne({ where: { code: instituteData.code } });
      if (!existing) {
        await Institute.create(instituteData);
        console.log(`✓ Institute created: ${instituteData.code}`);
      } else {
        console.log(`- Institute already exists: ${instituteData.code}`);
      }
    }

    // Seed staff
    const staffData = [
      {
        staffId: 'NDA-ADM-001',
        email: 'admin.nda@ncc.com',
        password: 'admin@123',
        institute: 'NDA',
      },
      {
        staffId: 'NDA-STAFF-001',
        email: 'officer1.nda@ncc.com',
        password: 'officer@123',
        institute: 'NDA',
      },
    ];

    for (const staff of staffData) {
      const existing = await Staff.findOne({ where: { email: staff.email } });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(staff.password, 10);
        await Staff.create({
          ...staff,
          password: hashedPassword,
        });
        console.log(`✓ Staff created: ${staff.email}`);
      } else {
        console.log(`- Staff already exists: ${staff.email}`);
      }
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('  Email: admin.nda@ncc.com');
    console.log('  Password: admin@123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
