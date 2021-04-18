require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { successPattern } = require('../helpers/resPattern');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const Size = require('../models/size.model');

const createOrder = async (req, res, next) => {
    try {
        let orderedItems = await OrderItem.insertMany(req.body.products);
        orderedItems = orderedItems.map((item)=>item._id);

        let sizes = req.body.products.map((product)=>product.size);
        
        // await Size.updateMany()

        let order = {
            userId: req.user._id,
            products: orderedItems,
            totalAmount: req.body.totalAmount,
            transactionId: req.body.transactionId
        }

        let createdOrder = Order.create(order);
        let obj = successPattern(httpStatus.OK, {data: createdOrder}, 'success');
        return res.status(obj.code).json(obj);

    } catch (e) {
        console.log("create order --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    createOrder,
}
