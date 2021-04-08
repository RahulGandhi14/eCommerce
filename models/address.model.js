const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const addressSchema = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    mobileNumber: {
        type: Number,
        trim: true,
        required: true,
    },
    pinCode: {
        type: Number,
        trim: true,
        required: true,
    },
    town: {
        type: String,
        trim: true,
        maxlength: 20,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        maxlength: 20,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        maxlength: 20,
        required: true,
    },
    default: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);