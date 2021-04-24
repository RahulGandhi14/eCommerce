const router = require('express').Router();
const { validate } = require('express-validation');
const { addressParamsValidation } = require('../helpers/joi.validation');
const addressCtrl = require('../controllers/address.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/')
    //POST /api/address
    .post(validate(addressParamsValidation.addAddress), addressCtrl.addAddress)
    //GET /api/address/userID ---> get all addresses by userID
    .get(isAuthenticated, addressCtrl.getAddressesByUserId)

router.route('/:addressID')
    //DELETE /api/address/:addressID\
    .delete(isAuthenticated, addressCtrl.deleteAddressById, addressCtrl.getAddressesByUserId)
    

module.exports = router;