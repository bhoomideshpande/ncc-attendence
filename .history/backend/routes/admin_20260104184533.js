const express = require('express');
const router = express.Router();
const Institute = require('../models/Institute');
const Batch = require('../models/Batch');

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
