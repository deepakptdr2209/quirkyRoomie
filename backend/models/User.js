const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    flatcode:{
        type: String,
        required: true
    },
   
    karmaPoints: {
        type: Number,
        default: 0
    },
},
    {timeStamps: true},
);
userSchema.index({ username: 1, flatcode: 1 }, { unique: true });


const User = mongoose.model('User', userSchema);

module.exports = User;