require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { successPattern } = require('../helpers/resPattern');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const createPaymentIntent = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount*100,
            currency: "inr"
        });
    
        let obj = successPattern(httpStatus.OK, { clientSecret: paymentIntent.client_secret });
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("create payment intent --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    createPaymentIntent,
}