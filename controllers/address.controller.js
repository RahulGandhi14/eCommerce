require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Address = require('../models/address.model');
const { successPattern, errorPattern } = require('../helpers/resPattern');

const addAddress = async (req, res, next) => {
    try {
        await Address.create(req.body);

        let allAddresses = await Address.find({ userID: req.body.userID });

        let obj = successPattern(httpStatus.OK, allAddresses, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("addAddress --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAddressesByUserId = async(req, res, next) => {
    try {
        let allAddresses = await Address.find({ userID: req.params.userID });
        let obj = successPattern(httpStatus.OK, allAddresses, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("getAddressByUserId --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    addAddress,
    getAddressesByUserId,
}