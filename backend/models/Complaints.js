const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Noise', 'Cleanliness', 'Bills', 'Pets', 'Other'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['Mild', 'Annoying', 'Major', 'Nuclear'],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flatCode: {
    type: String,
    required: true,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  resolved: {
    type: Boolean,
    default: false,
  },
  punishment: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;