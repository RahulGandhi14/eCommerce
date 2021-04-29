const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const addressRoute = require('./address.route');
const productRoute = require('./product.route');
const stripeRoute = require('./stripe.route');
const orderRoute = require('./order.route');
const wishlistRoute = require('./wishlist.route');

router.use('/auth', authRoute);
router.use('/address', addressRoute);
router.use('/product', productRoute);
router.use('/stripe', stripeRoute);
router.use('/order', orderRoute);
router.use('/wishlist', wishlistRoute);

module.exports = router;