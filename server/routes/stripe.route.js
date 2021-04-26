const router = require('express').Router();
const stripeCtrl = require('../controllers/stripe.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/create-payment-intent')
    //POST stripe/create-payment-intent
    .post(isAuthenticated, stripeCtrl.createPaymentIntent);

module.exports = router;