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

module.exports = {
    authParamsValidation
}