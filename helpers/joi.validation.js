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
            mobileNumber: Joi.number().min(10).max(10).required(),
            pinCode: Joi.number().min(6).max(6).required(),
            town: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            userId: Joi.string().required(),
            default: Joi.boolean().required(),
        })
    }
}

module.exports = {
    authParamsValidation,
    addressParamsValidation
}