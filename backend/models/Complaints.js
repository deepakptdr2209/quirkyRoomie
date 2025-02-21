const mongoose = require('mongoose');

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
  
  flatcode: {
    type: String, 
    required: true
  },
  votes: {
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  againstUserId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
   // Against whom the complaint is filed
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
},
{
  timestamps: true
});


const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
