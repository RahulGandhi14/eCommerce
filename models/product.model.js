const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    sizes: [{
        type: ObjectId,
        ref: 'Size',
        required: true,
    }],
    img1: {
        data: Buffer,
        contentType: String,
    },
    img2: {
        data: Buffer,
        contentType: String,
    },
    img3: {
        data: Buffer,
        contentType: String,
    },
    img4: {
        data: Buffer,
        contentType: String,
    },
    img5: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);