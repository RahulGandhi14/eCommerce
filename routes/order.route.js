const router = require('express').Router();
const orderCtrl = require('../controllers/order.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/')
    //POST /order
    .post(isAuthenticated, orderCtrl.createOrder)
    //GET /order
    .get(isAuthenticated, orderCtrl.getAllOrdersByUserId)

module.exports = router;