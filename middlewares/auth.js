require('dotenv').config()
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const APIError = require('../helpers/APIError')

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token)
        return next(new APIError('ACCESS DENIED!', httpStatus.FORBIDDEN, true))

    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifyToken
        if (verifyToken) next()
    } catch (e) {
        console.log('isAuthenticated -->', e)
        return next(new APIError('ACCESS DENIED!', httpStatus.FORBIDDEN, true))
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role === 1) {
            next()
        }
        return next(new APIError('ACCESS DENIED!', httpStatus.FORBIDDEN, true))
    } catch (e) {
        console.log('isAdmin -->', e)
        return next(new APIError('ACCESS DENIED!', httpStatus.FORBIDDEN, true))
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
}
