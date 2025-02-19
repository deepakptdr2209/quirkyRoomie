const express = require('express');
const { createComplaint, getComplaints, resolveComplaint, getTopComplaint } = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createComplaint ); // File a complaint
router.get('/:flatcode',authMiddleware, getComplaints); // Get all complaints for a flat
router.put('/resolve/:complaintId',authMiddleware, resolveComplaint); // Resolve a complaint
router.get('/top-complaint', getTopComplaint);

module.exports = router;
