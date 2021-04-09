const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const wishlistSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: ObjectId,
        ref: 'Product'
    }]
},{ timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);