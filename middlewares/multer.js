require('dotenv').config()
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/'
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = (req, files, cb) => {
    if (files.fieldname === 'img') {
        if (
            files.mimetype === 'image/png' ||
            files.mimetype === 'image/jpg' ||
            files.mimetype === 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(new Error('Only images are allowed'), false)
        }
    } else {
        cb(new Error('Only images are allowed'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
    fileFilter: fileFilter,
})

module.exports = upload
