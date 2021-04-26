require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Address = require('../models/address.model');
const { successPattern, errorPattern } = require('../helpers/resPattern');
const { ObjectId } = require('mongoose').Types;

const addAddress = async (req, res, next) => {
    try {

        if(req.body.default) await Address.findOneAndUpdate({ "default": true }, { $set: { "default": false } });

        await Address.create(req.body);

        let allAddresses = await Address.find({ userID: req.body.userID }).sort('default');

        let obj = successPattern(httpStatus.OK, allAddresses, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("addAddress --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAddressesByUserId = async(req, res, next) => {
    try {
        let allAddresses = await Address.find({ userID: req.user._id }).sort([['default', -1]]);
        let obj = successPattern(httpStatus.OK, allAddresses, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("getAddressByUserId --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const deleteAddressById = async (req, res, next) => {
    try {

        let address = await Address.findById(req.params.addressID).select('default');
        if(address.default) await Address.findOneAndUpdate({ "default": false }, { $set: {"default": true} });

        await Address.deleteOne({"_id": ObjectId(req.params.addressID)});

        next();
    } catch (e) {
        console.log("deleteAddressById --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    addAddress,
    getAddressesByUserId,
    deleteAddressById
}