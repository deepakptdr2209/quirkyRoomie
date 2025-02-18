const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
 const app = express();



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
    