const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    complaintId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Complaint',
        required : true
    },
    voteType: {
        type: String,
        enum: ['upvote', 'downvote'], 
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now 
      }
})
// Ensure a user can vote only once per complaint
voteSchema.index({ userId: 1, complaintId: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;