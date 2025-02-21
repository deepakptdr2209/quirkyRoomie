const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const complaintRoute = require('./routes/complaintRoute');
const voteRoute = require('./routes/votingRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// route for signup and login
app.use("/api/users", authRoute);
// complaint route
app.use('/api/complaint', complaintRoute);
// voting route

const startServer = async () => {
    try {
      await connectDB; 
  
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); 
    }
    };
    startServer();
    app.get('/', (req, res) => {   
        res.send('server is running!');
    });
    