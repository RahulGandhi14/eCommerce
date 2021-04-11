const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const addressRoute = require('./address.route');
const productRoute = require('./product.route');

router.use('/auth', authRoute);
router.use('/address', addressRoute);
router.use('/product', productRoute);

module.exports = router;