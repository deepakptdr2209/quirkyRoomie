const express = require('express');
const { signup, login,profile } = require('../controllers/authControllers'); 
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);
// Profile route
router.get('/profile',authMiddleware,profile );

module.exports = router;