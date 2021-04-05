const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        default: null,
    },
    role: {
        type: Number,
        default: 0
    },
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);