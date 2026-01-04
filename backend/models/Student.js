const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  nationality: {
    type: String,
    default: 'Indian',
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  parentName: {
    type: String,
  },
  instituteCode: {
    type: String,
    required: true,
  },
  photos: [{
    type: String, // URLs or base64
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);