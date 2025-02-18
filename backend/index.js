const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
 const app = express();



// Create an asynchronous function to initialize the app
const startServer = async () => {
    try {
      // Wait for the database connection to be established
      await connectDB; // This waits for the connection promise to resolve
  
      // Once MongoDB is connected, start the server
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Stop the process if MongoDB connection fails
    }
    };
    startServer();
    app.get('/', (req, res) => {   
        res.send('server is running!');
    });
    