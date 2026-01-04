const express = require('express');
const Parade = require('../models/Parade');

const router = express.Router();

// Create parade
router.post('/create', async (req, res) => {
  try {
    const paradeData = req.body;
    const newParade = new Parade(paradeData);
    await newParade.save();
    res.status(201).json({ message: 'Parade created successfully', parade: newParade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get parades for institute
router.get('/institute/:instituteCode', async (req, res) => {
  try {
    const parades = await Parade.find({ instituteCode: req.params.instituteCode }).sort({ date: -1 });
    res.json(parades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get parade by ID
router.get('/:id', async (req, res) => {
  try {
    const parade = await Parade.findById(req.params.id).populate('conductedBy', 'email');
    if (!parade) {
      return res.status(404).json({ message: 'Parade not found' });
    }
    res.json(parade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update parade
router.put('/:id', async (req, res) => {
  try {
    const updatedParade = await Parade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParade) {
      return res.status(404).json({ message: 'Parade not found' });
    }
    res.json({ message: 'Parade updated successfully', parade: updatedParade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;