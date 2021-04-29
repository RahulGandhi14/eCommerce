require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { successPattern, errorPattern } = require('../helpers/resPattern');
const Wishlist = require('../models/wishlist.model');
const { ObjectId } = require('mongoose').Types;

const addToWishlist = async (req, res, next) => {
    try {
        let userWishlist = await Wishlist.findOne({userId: req.user._id});

        if(userWishlist) {
            let alreadyInWishlist = await Wishlist.find({ userId: ObjectId(req.user._id) }).where({
                'products': {$elemMatch: {$in: [req.body.productId]}}
            });

            if(!alreadyInWishlist.length) {
                await Wishlist.findByIdAndUpdate(userWishlist._id, {
                    $push: { products: req.body.productId }
                })
            } else {
                return next(new APIError('Product is already in wishlist', httpStatus.BAD_REQUEST, true));
            }

        } else {
            let wishlist = await Wishlist.create({
                userId: req.user._id,
                products: [req.body.productId]
            });
        }

        let obj = successPattern(httpStatus.OK, {message: 'Product added to your wishlist!'}, 'success');
        return res.status(obj.code).json(obj);

    } catch (e) {
        console.log("addToWishlist --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAllWishlistProductsByUserId = async (req, res, next) => {
    try {
        let allProducts = await Wishlist.findOne({
            userId: req.user._id
        }).populate({
            path: 'products',
            populate: {
                path: 'product',
                select: '-img2 -img3 -img4 -img5 -sizes -deleted'
            },
        })

        let obj = successPattern(httpStatus.OK, allProducts, 'success');
        return res.status(obj.code).json(obj);

    } catch (e) {
        console.log("getAllWishlistProductsByUserId --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const removeFromWishlist = async (req, res, next) => {
    try {
        await Wishlist.findOneAndUpdate({
            userId: ObjectId(req.user._id)
        }, {
            $pull: { products: req.params.productId}
        });

        next();

    } catch (e) {
        console.log("removeFromWishlist --->", e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    addToWishlist,
    getAllWishlistProductsByUserId,
    removeFromWishlist
}