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
    },
    sold: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Size', sizeSchema);