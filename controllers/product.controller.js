require('dotenv').config();
const httpStatus = require('http-status');
const formidable = require('formidable')
const APIError = require('../helpers/APIError');
const fs = require("fs");
const Product = require('../models/product.model');
const Size = require('../models/size.model');
const { successPattern, errorPattern } = require('../helpers/resPattern');

const parse = el => JSON.parse(el);

const saveProduct = async (req, res, next) => {
    try {
        let form = new formidable({ multiples: true });
        form.parse(req, async (err, fields, files)=>{
            if(err){
                return next(new APIError(err?.message, httpStatus.BAD_REQUEST, true));
            }
    
            let product = new Product(fields);
            product.seller = req.user._id;
    
            [1,2,3,4,5].map((key)=>{
                if(files[`img${key}`]){
                    if(files[`img${key}`]?.size <= 1024*1024*5){
                        product[`img${key}`].data = fs.readFileSync(files[`img${key}`]?.path);
                        product[`img${key}`].contentType = files[`img${key}`]?.type;
                    } else {
                        return next(new APIError('File size should be less than 5MB', httpStatus.BAD_REQUEST, true));
                    }
                }
            });
    
            let productSizes = parse(fields.sizes);
            let savedSizes = [];
            for(let i=0; i<productSizes.length; i++){
                let size = await Size.create(productSizes[i]);
                savedSizes = [...savedSizes, size._id];
            }
            product.sizes = savedSizes;
    
            await product.save();
    
            let obj = successPattern(httpStatus.OK, {message: 'Product created successfully!'}, 'success');
            return res.status(obj.code).json(obj);
        })
    } catch (e) {
        console.log("save product --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        let allProducts = await Product.find({deleted: false}).populate('sizes');
        let obj = successPattern(httpStatus.OK, allProducts, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("get all products --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getProductById = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.productId).populate('sizes');
        let obj = successPattern(httpStatus.OK, product, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        console.log("get product by id --->",e);
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    saveProduct,
    getAllProducts,
    getProductById
}
