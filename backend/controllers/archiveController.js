const Complaint = require('../models/complaintModel');
const Vote = require('../models/voteModel');
const User = require('../models/userModel');

const archiveDownvotedComplaints = async () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Find complaints that are 3+ days old
    const oldComplaints = await Complaint.find({ createdAt: { $lte: threeDaysAgo } });

    for (const complaint of oldComplaints) {
        // Get total number of users in the flat
        const totalUsers = await User.countDocuments({ flatCode: complaint.flatCode });

        // Count downvotes for this complaint
        const downvoteCount = await Vote.countDocuments({ complaintId: complaint._id, voteType: 'downvote' });

        // Check if downvotes exceed 50% of total users in the flat
        if (downvoteCount > totalUsers / 2) {
            complaint.archived = true;
            await complaint.save();
            console.log(`Complaint ${complaint._id} archived due to majority downvotes.`);
        }
    }
};  
module.exports = archiveDownvotedComplaints;
