import React from 'react';
import "./ProductsLayout.scss";
import "../../style.css";
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ProductCard = ({productDetails}) => {

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return 'data:image/jpeg;base64,' + window.btoa(binary);
    };

    return (
        <Link to={`/product/${productDetails._id}`}>
            <div className="product-card cursorPointer">
                <div className="img-container relative">
                    <img src={arrayBufferToBase64(productDetails.img1.data.data)} alt="product"/>
                    <div className="hide-div absolute">
                        <Box className="wishlist" mx={2} mt={1}>
                            <Button variant="outlined" fullWidth>Wishlist</Button>
                        </Box>
                    </div>
                </div>
                <div className="product-info">
                    <div className="brand-info">
                        <h4>
                            {productDetails.brandName}
                            {/* <span>4.5&#9733;</span> */}
                        </h4>
                        <span>{productDetails.productName}</span>
                        <div className="price-info">
                            <h4>Rs. {productDetails.sellingPrice}</h4>&nbsp;
                            <h6 className="originalPrice">Rs. {productDetails.mrp}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;
