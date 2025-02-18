const mongoose = require('mongoose');
const User = require('./User');
// Complaint Schema
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  complaintType: {
    type: String,
    enum: ['Noise', 'Cleanliness', 'Bills', 'Pets', 'Other'], 
  },
  severity: {
    type: String,
    enum: ['Mild', 'Annoying', 'Major', 'Nuclear'], 
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now 
  },
  flatCode: {
    type: String, 
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
});


const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
