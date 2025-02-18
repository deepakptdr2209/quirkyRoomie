const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = ()=>{
    return mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });
}
module.exports = connectDB();
