require('dotenv').config()
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const APIError = require('../helpers/APIError')
const { successPattern, errorPattern } = require('../helpers/resPattern')
const User = require('../models/user.model')
const CryptoJS = require('crypto-js')
const fs = require('fs')

const userRegister = async (req, res, next) => {
    try {
        let isDuplicateEmail = await User.findOne({ email: req.body.email })
        if (isDuplicateEmail)
            return next(
                new APIError(
                    'Email already exists',
                    httpStatus.BAD_REQUEST,
                    true
                )
            )

        const salt = await bcrypt.genSalt(10)
        let password = CryptoJS.AES.decrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8)

        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const savedUser = await User.create(req.body)
        const obj = successPattern(
            httpStatus.OK,
            {
                email: savedUser.email,
                name: savedUser.name,
                _id: savedUser._id,
            },
            'success'
        )
        return res.status(obj.code).json(obj)
    } catch (e) {
        console.log('userRegister --->', e)
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true))
    }
}

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user)
            return next(
                new APIError(
                    'Email does not exist!',
                    httpStatus.BAD_REQUEST,
                    true
                )
            )

        let decryptedPassword = CryptoJS.AES.decrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8)
        const validPassword = await bcrypt.compare(
            decryptedPassword,
            user.password
        )
        if (!validPassword)
            return next(
                new APIError(
                    'Password is incorrect',
                    httpStatus.BAD_REQUEST,
                    true
                )
            )

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        )

        let userObj = {
            token,
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
        }

        let obj = successPattern(httpStatus.OK, userObj, 'success')
        return res.status(obj.code).json(obj)
    } catch (e) {
        console.log('login --->', e)
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true))
    }
}

module.exports = {
    userRegister,
    login,
}
