const Complaints = require('../models/Complaints');

const createComplaint = async (req, res) =>{
   try {
     const { title, description, userId, flatcode, timestamp, complaintType, severity } = req.body;
     if (!title || !description || !complaintType || !severity) {
        return res.status(400).json({ message: 'All fields are required' });
    };
    const newComplaint = new Complaints({
        title,
        description,
        userId,
        flatcode,
        severity,
        complaintType,
        timestamp
    });
    await newComplaint.save();
    res.statu(200).json({
        message: "Complaint successfully created"
    });

   } catch (error) {
     console.error('Error filing complaint:', error);
     res.status(500).json({ message: 'Internal server error' });
   };
}
 const getComplaints = async (req,res) => {
    try {
        const {flatcode} = req.params
        const complaints = await Complaints.find({flatcode}).populate( 'userId', 'username');
        res.status(200).json(complaints);

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

module.exports = { createComplaint,resolveComplaint,getComplaints };   