const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderItemSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true,
    },
    size: {
        type: ObjectId,
        ref: 'Size',
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("OrderItem", orderItemSchema);