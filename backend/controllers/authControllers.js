const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/jwtConfig');

const User = require('../models/User');
 // Signup controller
exports.signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }
    const { username, email, password, flatcode } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            flatcode
        });
          const user = await newUser.save();
          if(user){
            const token = jwt.sign(
                { userId : user._id},
                  jwtSecret, 
                { expiresIn : jwtExpiration});
            
                res.status(201).json({
                userId: user._id,
                username: user.username,
                email: user.email,
                flatcode: user.flatcode,
                karmaPoints: user.karmaPoints,
                token: token
            })
          }
      
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "User with this name already exists in this flat." });
        }
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
  // Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id },
            jwtSecret,
            { expiresIn: jwtExpiration }
        );
        res.status(200).json({ 
            userId: user._id,
            username: user.username,
            email: user.email,
            flatcode: user.flatcode,
            karmaPoints: user.karmaPoints,
            token: token
         });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Profile controller

 exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            flatcode: user.flatcode,
            karmaPoints: user.karmaPoints
        });

    } catch (error){
        console.error("Profile Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
 }