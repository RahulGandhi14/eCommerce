const router = require('express').Router()
const productCtrl = require('../controllers/product.controller')
const { isAuthenticated, isAdmin } = require('../middlewares/auth')
const upload = require('../middlewares/multer')

router
    .route('/')
    //POST /api/product
    .post(
        isAuthenticated,
        isAdmin,
        upload.array('img'),
        productCtrl.saveProduct
    )
    //GET /api/product
    .get(productCtrl.getAllProducts)

router
    .route('/:productId')
    //POST /api/product/:productId
    .get(productCtrl.getProductById)

module.exports = router
