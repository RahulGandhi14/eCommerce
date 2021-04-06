const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const addressRoute = require('./address.route');

//auth Routes
router.use('/auth', authRoute);
router.use('/address', addressRoute);

module.exports = router;