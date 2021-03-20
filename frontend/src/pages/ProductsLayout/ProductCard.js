import React from 'react';
import "./ProductsLayout.scss";
import "../../style.css";
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import { Box, Button } from '@material-ui/core';

const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="img-container relative">
                <img src={shirtImg}/>
                <div className="hide-div absolute">
                    <Box className="wishlist" mx={2} mt={1}>
                        <Button variant="outlined" fullWidth>Wishlist</Button>
                    </Box>
                </div>
            </div>
            <div className="product-info">
                <div className="brand-info">
                    <h4>
                        Nike
                        {/* <span>4.5&#9733;</span> */}
                    </h4>
                    <span>Men slip fit casual shirt</span>
                    <div className="price-info">
                        <h4>Rs. 517</h4>&nbsp;
                        <h6>Rs. 1299</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
