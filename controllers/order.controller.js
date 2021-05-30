require('dotenv').config()
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const { successPattern } = require('../helpers/resPattern')
const { ObjectId } = require('mongoose').Types
const Order = require('../models/order.model')
const OrderItem = require('../models/orderItem.model')
const Size = require('../models/size.model')

const createOrder = async (req, res, next) => {
    try {
        let orderedItems = await OrderItem.insertMany(req.body.products)
        orderedItems = orderedItems.map((item) => item._id)

        let sizes = req.body.products.map((product) => ObjectId(product.size))

        await Size.updateMany(
            {
                _id: { $in: sizes },
            },
            {
                $inc: { inventory: -1 },
            }
        )

        let order = {
            userId: req.user._id,
            products: orderedItems,
            totalAmount: req.body.totalAmount,
            transactionId: req.body.transactionId,
        }

        let createdOrder = await Order.create(order)

        let obj = successPattern(httpStatus.OK, createdOrder, 'success')
        return res.status(obj.code).json(obj)
    } catch (e) {
        console.log('create order --->', e)
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true))
    }
}

const getAllOrdersByUserId = async (req, res, next) => {
    try {
        let { page = 1, limit = 2 } = req.query
        page = parseInt(page)
        limit = parseInt(limit)

        let allOrders = await Order.find({
            userId: ObjectId(req.user._id),
        })
            .select('-transactionId -userId')
            .populate({
                path: 'products',
                populate: {
                    path: 'product',
                    select: '-img2 -img3 -img4 -img5 -sizes -deleted',
                },
            })
            .populate({
                path: 'products',
                populate: {
                    path: 'size',
                },
            })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort([['createdAt', -1]])

        let count = await Order.countDocuments({
            userId: ObjectId(req.user._id),
        })

        allOrders.map((order) => {
            order.products.map((product) => {
                product.product.img1 += process.env.CLOUD_URL
            })
        })

        let obj = successPattern(httpStatus.OK, { allOrders, count }, 'success')
        return res.status(obj.code).json(obj)
    } catch (e) {
        console.log('getAllOrdersByUserId --->', e)
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true))
    }
}

const rateProduct = async (req, res, next) => {
    try {
        await OrderItem.findByIdAndUpdate(req.body.orderItemId, {
            ratings: req.body.ratings,
        })

        let obj = successPattern(httpStatus.OK, { message: 'Rated' }, 'success')
        return res.status(obj.code).json(obj)
    } catch (e) {
        console.log('reviewProduct --->', e)
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true))
    }
}

module.exports = {
    createOrder,
    getAllOrdersByUserId,
    rateProduct,
}
