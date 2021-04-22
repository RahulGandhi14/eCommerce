const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const sizeSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
        min: 0,
    },
    sold: {
        type: Number,
        default: 0,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Size', sizeSchema);