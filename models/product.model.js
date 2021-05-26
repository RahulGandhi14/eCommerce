const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema(
    {
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
        sizes: [
            {
                type: ObjectId,
                ref: 'Size',
                required: true,
            },
        ],
        img1: {
            type: String,
            trim: true,
        },
        img2: {
            type: String,
            trim: true,
        },
        img3: {
            type: String,
            trim: true,
        },
        img4: {
            type: String,
            trim: true,
        },
        img5: {
            type: String,
            trim: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
