const Complaints = require('../models/Complaints');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const createComplaint = async (req, res) =>{
   try {
   
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

      const userId = req.user.userId;
     
     const { title, description, flatcode, timestamp, complaintType, severity,againstUserId } = req.body;
     if (!title || !description || !complaintType || !severity || !againstUserId) {
        return res.status(400).json({ message: 'All fields are required' });
    };
    const newComplaint = new Complaints({
        title,
        description,
        userId,
        againstUserId,
        flatcode,
        severity,
        complaintType,
        timestamp
    });
    await newComplaint.save();
    res.status(200).json({
        message: "Complaint successfully created"
    });

   } catch (error) {
     console.error('Error filing complaint:', error);
     res.status(500).json({ message: 'Internal server error' });
   };
}
 const getComplaints = async (req,res) => {
    try {
        let {flatcode} = req.params;
        flatcode = String(flatcode).trim();

        const complaints = await Complaints.find({flatcode})
        .populate( 'userId', 'username')
        .populate('againstUserId', 'username');

        res.status(201).json(complaints);

    }catch(error){
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
 }


const resolveComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaints.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.resolved = true;
        await complaint.save();

        res.json({ message: 'Complaint marked as resolved' });

    } catch (error) {
        console.error('Error resolving complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getTopComplaint = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const topComplaint = await Complaint.findOne({
            timestamp: { $gte: oneWeekAgo },
            archived: { $ne: true }
        }).sort({ 'votes.upvote': -1 }).populate('userId', 'username');

        if (!topComplaint) {
            return res.status(404).json({ message: 'No top complaint found this week' });
        }

        res.status(200).json(topComplaint);
    } catch (error) {
        console.error('Error fetching top complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createComplaint,resolveComplaint,getComplaints,getTopComplaint };   