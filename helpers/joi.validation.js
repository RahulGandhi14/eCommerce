const Joi = require('@hapi/joi');

const authParamsValidation = {
    userRegister: {
        body: Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            password: Joi.string().min(3),
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(3),
        })
    }
}

const addressParamsValidation = {
    addAddress: {
        body: Joi.object({
            name: Joi.string().required(),
            mobileNumber: Joi.string().length(10).required(),
            pinCode: Joi.string().length(6).required(),
            town: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            userID: Joi.string().required(),
            default: Joi.boolean().required(),
        })
    }
}

module.exports = {
    authParamsValidation,
    addressParamsValidation,
}