const express = require('express');
const { createComplaint, getComplaints, resolveComplaint } = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createComplaint ); // File a complaint
router.get('/:flatCode',authMiddleware, getComplaints); // Get all complaints for a flat
router.put('/resolve/:complaintId',authMiddleware, resolveComplaint); // Resolve a complaint

module.exports = router;
