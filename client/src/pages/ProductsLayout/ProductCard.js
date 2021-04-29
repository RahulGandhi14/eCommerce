import React from 'react';
import "./ProductsLayout.scss";
import "../../style.css";
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from '../util';
import { Instance } from '../../axios';
import { wishlistRequests } from '../../request';
import { isAuthenticated } from '../auth/AuthHelpers';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';

const ProductCard = ({productDetails, removeFromWishlist}) => {

    let user = isAuthenticated();
    let url = window.location.hash;

    const addToWishlist = async () => {
        let result = await Instance.post(wishlistRequests.wishlist, { productId: productDetails._id }, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });

        if(result && result.data) {
            toast.dark('Item added to wishlist');
        }
    }

    return (
        <div className="product-card cursorPointer">
            <div className="img-container relative">
                {url === '#/wishlist' && <CloseIcon className="closeBtn" onClick={()=>removeFromWishlist(productDetails._id)}/>}
                <Link to={`/product/${productDetails._id}`}>
                    <img src={arrayBufferToBase64(productDetails.img1.data.data)} alt="product"/>
                </Link>
                {url !== '#/wishlist' && (
                    <div className="hide-div absolute">
                        <Box className="wishlist" mx={2} mt={1}>
                            <Button variant="outlined" fullWidth onClick={addToWishlist}>Wishlist</Button>
                        </Box>
                    </div>
                )}
            </div>
            <Link to={`/product/${productDetails._id}`}>
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
            </Link>
        </div>
    )
}

export default ProductCard;
