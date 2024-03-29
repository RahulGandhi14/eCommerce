const router = require('express').Router();
const { validate } = require('express-validation');
const { authParamsValidation } = require('../helpers/joi.validation');
const authCtrl = require('../controllers/auth.controller');

router.route('/userRegister')
    //POST /api/auth/userRegister
    .post(validate(authParamsValidation.userRegister), authCtrl.userRegister);

router.route('/login')
    //POST api/auth/login
    .post(validate(authParamsValidation.login), authCtrl.login);

module.exports = router;