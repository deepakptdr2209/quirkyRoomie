const asyncHandler = require('express-async-handler');
const Complaints = require('../models/Complaints');
const User = require('../models/User');
const { punishmentSuggestions } = require('../data/punishmentSuggestion');

exports.createComplaint = async (req, res) =>{
   try {
   
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

      const createdBy = req.user.userId;
     
     const { title, description, flatCode, timestamp, type, severity } = req.body;
     if (!title || !description || !type || !severity || !createdBy) {
        return res.status(400).json({ message: 'All fields are required' });
    };
    const newComplaint = new Complaints({
        title,
        description,
       
        createdBy,
        flatCode,
        severity,
        type,
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
exports.getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaints.find({ flatCode: req.user.flatCode })
    .populate('createdBy', 'name')
    .sort('-createdAt');

  res.json(complaints);
});

// @desc    Update complaint (upvote/downvote)
// @route   PUT /api/complaints/:id/vote
// @access  Private
exports.voteComplaint = asyncHandler(async (req, res) => {
  try {
    const { action } = req.body; // 'upvote' or 'downvote'
    const complaint = await Complaints.findById(req.params.id);
  
    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }
  
    // Check if user has already voted
    const hasUpvoted = complaint.upvotes.includes(req.user._id);
    const hasDownvoted = complaint.downvotes.includes(req.user._id);
  
    if (action === 'upvote') {
      if (hasUpvoted) {
        complaint.upvotes = complaint.upvotes.filter(id => id.toString() !== req.user._id.toString());
      } else {
        complaint.upvotes.push(req.user._id);
        if (hasDownvoted) {
          complaint.downvotes = complaint.downvotes.filter(id => id.toString() !== req.user._id.toString());
        }
      }
    } else if (action === 'downvote') {
      if (hasDownvoted) {
        complaint.downvotes = complaint.downvotes.filter(id => id.toString() !== req.user._id.toString());
      } else {
        complaint.downvotes.push(req.user._id);
        if (hasUpvoted) {
          complaint.upvotes = complaint.upvotes.filter(id => id.toString() !== req.user._id.toString());
        }
      }
    }
  
    // Check if complaint needs punishment (10+ upvotes)
    if (complaint.upvotes.length >= 10 && !complaint.punishment) {
      const punishments = punishmentSuggestions[complaint.type];
      complaint.punishment = punishments[Math.floor(Math.random() * punishments.length)];
    }
  
    // Auto-archive if 3+ downvotes and complaint is older than 3 days
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    if (complaint.downvotes.length >= 3 && complaint.createdAt < threeDaysAgo) {
      complaint.resolved = true;
    }
  
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (error) {
      

  }  
  
  });
  
  // @desc    Mark complaint as resolved
  // @route   PUT /api/complaints/:id/resolve
  // @access  Private
  exports.resolveComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaints.findById(req.params.id);
  
    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }
  
    // Only the creator or someone with 3+ karma points can resolve
    const user = await User.findById(req.user._id);
    if (complaint.createdBy.toString() !== req.user._id.toString() && user.karmaPoints < 3) {
      res.status(403);
      throw new Error('Not authorized to resolve this complaint');
    }
  
    complaint.resolved = true;
    
    // Award karma points
    if (complaint.createdBy.toString() !== req.user._id.toString()) {
      user.karmaPoints += 1;
      await user.save();
    }
  
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  });
  
  // @desc    Get leaderboard stats
  // @route   GET /api/complaints/leaderboard
  // @access  Private
  exports.getLeaderboard = asyncHandler(async (req, res) => {
    // Get complaints from the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const complaints = await Complaints.find({
      flatCode: req.user.flatCode,
      createdAt: { $gte: thirtyDaysAgo },
    }).populate('createdBy', 'name');
  
    // Get users in the flat
    const users = await User.find({ flatCode: req.user.flatCode })
      .select('name karmaPoints');
  
    // Calculate worst offenders (most complaints against)
    const complaintCounts = {};
    complaints.forEach(complaint => {
      if (complaint.upvotes.length > complaint.downvotes.length) {
        const userId = complaint.createdBy._id.toString();
        complaintCounts[userId] = (complaintCounts[userId] || 0) + 1;
      }
    });
  
    const worstOffenders = users
      .map(user => ({
        id: user._id,
        name: user.name,
        complaints: complaintCounts[user._id.toString()] || 0,
      }))
      .sort((a, b) => b.complaints - a.complaints)
      .slice(0, 3);
  
    // Calculate top categories
    const categories = {};
    complaints.forEach(complaint => {
      categories[complaint.type] = (categories[complaint.type] || 0) + 1;
    });
  
    const topCategories = Object.entries(categories)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  
    // Get best flatmates (highest karma points)
    const bestFlatmates = users
      .sort((a, b) => b.karmaPoints - a.karmaPoints)
      .slice(0, 3)
      .map(user => ({
        id: user._id,
        name: user.name,
        karmaPoints: user.karmaPoints,
      }));
  
    res.json({
      worstOffenders,
      topCategories,
      bestFlatmates,
    });
  });

