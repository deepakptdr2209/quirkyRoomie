const Complaint = require('../models/Complaint');

const archiveDownvotedComplaints = async () => {
    try {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const complaintsToArchive = await Complaint.find({
            'votes.downvote': { $gte: 5 }, // Auto-archive threshold
            timestamp: { $lte: threeDaysAgo } // Older than 3 days
        });

        await Complaint.updateMany(
            { _id: { $in: complaintsToArchive.map(c => c._id) } },
            { $set: { archived: true } }
        );

        console.log(`Archived ${complaintsToArchive.length} complaints.`);
    } catch (error) {
        console.error('Error archiving complaints:', error);
    }
};

// Run every 24 hours
setInterval(archiveDownvotedComplaints, 24 * 60 * 60 * 1000);

