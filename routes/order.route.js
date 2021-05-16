const router = require('express').Router()
const orderCtrl = require('../controllers/order.controller')
const { isAuthenticated } = require('../middlewares/auth')

router
    .route('/')
    //POST /order
    .post(isAuthenticated, orderCtrl.createOrder)
    //GET /order
    .get(isAuthenticated, orderCtrl.getAllOrdersByUserId)

router
    .route('/rate')
    //POST /order/rate
    .post(isAuthenticated, orderCtrl.rateProduct)

module.exports = router
