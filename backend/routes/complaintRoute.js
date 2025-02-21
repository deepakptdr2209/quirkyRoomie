const express = require('express');
const { 
    createComplaint,
     getComplaints,
    voteComplaint,
    resolveComplaint,
    getLeaderboard} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(authMiddleware, getComplaints)
  .post(authMiddleware, createComplaint); // Create a new complaint & Get all complaints

router.put('/:id/vote',authMiddleware,voteComplaint ); // Upvote or downvote a complaint

router.put('/:id/resolve',authMiddleware,resolveComplaint ); // Resolve a complaint

router.get('/leaderboard',authMiddleware,getLeaderboard ); // Get leaderboard

module.exports = router;
