const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const uploads = (file, folder = 'eCommerce') => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    fileName: result.public_id,
                })
            },
            {
                resource_type: 'auto',
                folder: folder,
            }
        )
    })
}

const destroy = (fileName) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileName, (result) => {
            console.log(result)
            resolve(result)
        })
    })
}

module.exports = {
    uploads,
}
