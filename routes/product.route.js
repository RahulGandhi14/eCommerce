const router = require('express').Router();
const productCtrl = require('../controllers/product.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/')
    //POST /api/product
    .post(isAuthenticated, productCtrl.saveProduct)
    //GET /api/product
    .get(productCtrl.getAllProducts)

router.route('/:productId')
    //POST /api/product/:productId
    .get(productCtrl.getProductById)

module.exports = router;