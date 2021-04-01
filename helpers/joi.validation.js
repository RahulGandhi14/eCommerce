const Joi = require('@hapi/joi');

const authParamsValidation = {
    userRegister: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().min(3),
        }
    }
}

module.exports = {
    authParamsValidation
}