const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');

//auth Routes
router.use('/auth', authRoute);

module.exports = router;