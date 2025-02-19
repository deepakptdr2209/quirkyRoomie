const express = require('express');
const { voteComplaint } = require('../controllers/votingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/vote', authMiddleware, voteComplaint);

module.exports = router;