const Vote = require('../models/Vote');
const Complaint = require('../models/Complaints');

const voteComplaint = async (req, res) => {
    try {
        const { complaintId, voteType } = req.body;
        const userId = req.user.userId; // Authenticated user

        // Validate input
        if (!complaintId || !['upvote', 'downvote'].includes(voteType)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Check if user already voted
        const existingVote = await Vote.findOne({ userId, complaintId });

        if (existingVote) {
            // If vote type is the same, remove vote (toggle mechanism)
            if (existingVote.voteType === voteType) {
                await Vote.deleteOne({ _id: existingVote._id });

                // Update complaint votes
                await Complaint.findByIdAndUpdate(complaintId, {
                    $inc: { [`votes.${voteType}`]: -1 } // Decrement count
                });

                return res.status(200).json({ message: 'Vote removed' });
            } else {
                // Update the vote type
                existingVote.voteType = voteType;
                await existingVote.save();

                // Adjust complaint votes
                await Complaint.findByIdAndUpdate(complaintId, {
                    $inc: { [`votes.${voteType}`]: 1, [`votes.${existingVote.voteType}`]: -1 }
                });

                return res.status(200).json({ message: 'Vote updated' });
            }
        } else {
            // Create new vote
            const newVote = new Vote({ userId, complaintId, voteType });
            await newVote.save();

            // Increment vote count in Complaint
            await Complaint.findByIdAndUpdate(complaintId, {
                $inc: { [`votes.${voteType}`]: 1 }
            });

            return res.status(201).json({ message: 'Vote added' });
        }
    } catch (error) {
        console.error('Error voting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { voteComplaint };
