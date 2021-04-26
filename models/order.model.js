const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        type: ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received", "Confirmed"],
    },
    address: {
        type: ObjectId,
        ref: 'Address',
        // required: true,
    },
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);