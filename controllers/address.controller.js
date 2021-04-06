require('dotenv').config();
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { successPattern, errorPattern } = require('../helpers/resPattern');

const addAddress = async (req, res, next) => {
    try {
        //
    } catch (e) {
        console.log("addAddress --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    addAddress
}