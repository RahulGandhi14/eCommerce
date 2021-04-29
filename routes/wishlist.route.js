const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/auth');
const wishlistCtrl = require('../controllers/wishlist.controller');

router.route('/')
    //POST /api/wishlist ---> add to wishlist
    .post(isAuthenticated, wishlistCtrl.addToWishlist)
    
    //GET /api/wishlist ---> get all products added to wishlist by userId
    .get(isAuthenticated, wishlistCtrl.getAllWishlistProductsByUserId)

router.route('/:productId')
    //DELETE /api/wishlist ---> remove product from wishlist
    .delete(isAuthenticated, wishlistCtrl.removeFromWishlist, wishlistCtrl.getAllWishlistProductsByUserId)

module.exports = router;
