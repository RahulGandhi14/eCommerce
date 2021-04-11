const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        trim: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    mrp: {
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
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);