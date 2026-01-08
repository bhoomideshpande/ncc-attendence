const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Institute = require('../models/Institute');
const Batch = require('../models/Batch');
const Staff = require('../models/Staff');

// Seed full database with institutes and staff credentials
router.post('/seed-full', async (req, res) => {
  try {
    console.log('Starting full database seed...');

    // First, seed institutes
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
      {
        code: 'IAF',
        name: 'Indian Air Force Academy',
        shortName: 'IAF',
        battalion: 'Dundigal',
        logo: 'https://via.placeholder.com/50',
        city: 'Hyderabad',
        totalCadets: 300,
        status: 'active',
      },
      {
        code: 'INS',
        name: 'Indian Naval Academy',
        shortName: 'INS',
        battalion: 'Ezhimala',
        logo: 'https://via.placeholder.com/50',
        city: 'Kerala',
        totalCadets: 280,
        status: 'active',
      },
      {
        code: 'RIMC',
        name: 'Rashtriya Indian Military College',
        shortName: 'RIMC',
        battalion: 'Dehradun',
        logo: 'https://via.placeholder.com/50',
        city: 'Dehradun',
        totalCadets: 550,
        status: 'active',
      },
      {
        code: 'KLE_TECH',
        name: 'KLE Technological University, Hubli',
        shortName: 'KLE Tech',
        battalion: 'Pioneer',
        logo: 'https://via.placeholder.com/50',
        city: 'Hubli',
        totalCadets: 120,
        status: 'active',
      },
      {
        code: 'PC_JABIN',
        name: 'PC Jabin College, Hubli',
        shortName: 'PC Jabin',
        battalion: 'Pioneer',
        logo: 'https://via.placeholder.com/50',
        city: 'Hubli',
        totalCadets: 90,
        status: 'active',
      },
      {
        code: 'SVSB',
        name: 'SVSB College, Saundatti',
        shortName: 'SVSB',
        battalion: 'Pioneer',
        logo: 'https://via.placeholder.com/50',
        city: 'Saundatti',
        totalCadets: 70,
        status: 'active',
      },
    ];

    // Create institutes
    for (const instituteData of institutes) {
      const existing = await Institute.findOne({ where: { code: instituteData.code } });
      if (!existing) {
        await Institute.create(instituteData);
        console.log(`✓ Institute created: ${instituteData.code}`);
      }
    }

    // Seed staff with hashed passwords
    const staffData = [
      // NDA Staff
      {
        staffId: 'NDA-ADM-001',
        email: 'admin.nda@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'NDA',
      },
      {
        staffId: 'NDA-STAFF-001',
        email: 'officer1.nda@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'NDA',
      },
      {
        staffId: 'NDA-STAFF-002',
        email: 'officer2.nda@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'NDA',
      },

      // IMA Staff
      {
        staffId: 'IMA-ADM-001',
        email: 'admin.ima@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'IMA',
      },
      {
        staffId: 'IMA-STAFF-001',
        email: 'officer1.ima@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'IMA',
      },
      {
        staffId: 'IMA-STAFF-002',
        email: 'officer2.ima@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'IMA',
      },

      // IAF Staff
      {
        staffId: 'IAF-ADM-001',
        email: 'admin.iaf@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'IAF',
      },
      {
        staffId: 'IAF-STAFF-001',
        email: 'officer1.iaf@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'IAF',
      },

      // INS Staff
      {
        staffId: 'INS-ADM-001',
        email: 'admin.ins@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'INS',
      },
      {
        staffId: 'INS-STAFF-001',
        email: 'officer1.ins@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'INS',
      },

      // RIMC Staff
      {
        staffId: 'RIMC-ADM-001',
        email: 'admin.rimc@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'RIMC',
      },
      {
        staffId: 'RIMC-STAFF-001',
        email: 'officer1.rimc@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'RIMC',
      },

      // KLE Tech Staff
      {
        staffId: 'KLE_TECH-ADM-001',
        email: 'admin.kle@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'KLE_TECH',
      },
      {
        staffId: 'KLE_TECH-STAFF-001',
        email: 'officer1.kle@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'KLE_TECH',
      },

      // PC Jabin Staff
      {
        staffId: 'PC_JABIN-ADM-001',
        email: 'admin.pcjabin@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'PC_JABIN',
      },
      {
        staffId: 'PC_JABIN-STAFF-001',
        email: 'officer1.pcjabin@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'PC_JABIN',
      },

      // SVSB Staff
      {
        staffId: 'SVSB-ADM-001',
        email: 'admin.svsb@ncc.com',
        password: await bcrypt.hash('admin@123', 10),
        institute: 'SVSB',
      },
      {
        staffId: 'SVSB-STAFF-001',
        email: 'officer1.svsb@ncc.com',
        password: await bcrypt.hash('officer@123', 10),
        institute: 'SVSB',
      },
    ];

    // Create staff
    for (const staff of staffData) {
      const existing = await Staff.findOne({ where: { email: staff.email } });
      if (!existing) {
        await Staff.create(staff);
        console.log(`✓ Staff created: ${staff.email}`);
      }
    }

    // Prepare credentials summary
    const credentials = {
      note: 'All passwords are: admin@123 for admins and officer@123 for staff',
      adminLogins: {},
      staffLogins: {},
    };

    institutes.forEach(inst => {
      const adminEmail = staffData.find(s => s.institute === inst.code && s.staffId.includes('ADM'))?.email;
      const staffEmail = staffData.find(s => s.institute === inst.code && s.staffId.includes('STAFF'))?.email;

      credentials.adminLogins[inst.code] = {
        institute: inst.name,
        email: adminEmail,
        password: 'admin@123',
        staffId: staffData.find(s => s.institute === inst.code && s.staffId.includes('ADM'))?.staffId,
      };

      credentials.staffLogins[inst.code] = {
        institute: inst.name,
        email: staffEmail,
        password: 'officer@123',
        staffId: staffData.find(s => s.institute === inst.code && s.staffId.includes('STAFF-001'))?.staffId,
      };
    });

    res.json({
      message: 'Database seeded successfully',
      credentials,
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// Seed institutes (one-time data load)
router.post('/seed', async (req, res) => {
  try {
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
      {
        code: 'IAF',
        name: 'Indian Air Force Academy',
        shortName: 'IAF',
        battalion: 'Dundigal',
        logo: 'https://via.placeholder.com/50',
        city: 'Hyderabad',
        totalCadets: 300,
        status: 'active',
      },
      {
        code: 'INS',
        name: 'Indian Naval Academy',
        shortName: 'INS',
        battalion: 'Ezhimala',
        logo: 'https://via.placeholder.com/50',
        city: 'Kerala',
        totalCadets: 280,
        status: 'active',
      },
      {
        code: 'RIMC',
        name: 'Rashtriya Indian Military College',
        shortName: 'RIMC',
        battalion: 'Dehradun',
        logo: 'https://via.placeholder.com/50',
        city: 'Dehradun',
        totalCadets: 550,
        status: 'active',
      },
    ];

    for (const instituteData of institutes) {
      const existing = await Institute.findOne({ where: { code: instituteData.code } });
      if (!existing) {
        await Institute.create(instituteData);
      }
    }

    res.json({ message: 'Institutes seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding institutes', error: error.message });
  }
});

// Admin: Create batch for institute
router.post('/:instituteId/batches', async (req, res) => {
  try {
    const { year, totalStudents } = req.body;
    const { instituteId } = req.params;

    // Verify institute exists
    const institute = await Institute.findByPk(instituteId);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const batch = await Batch.create({
      year,
      instituteId,
      totalStudents,
      status: 'active',
    });

    res.status(201).json(batch);
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ message: 'Error creating batch', error: error.message });
  }
});

// Get batches for institute
router.get('/:instituteId/batches', async (req, res) => {
  try {
    const { instituteId } = req.params;

    const batches = await Batch.findAll({
      where: { instituteId, status: 'active' },
      order: [['year', 'ASC']],
    });

    res.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ message: 'Error fetching batches', error: error.message });
  }
});

module.exports = router;
