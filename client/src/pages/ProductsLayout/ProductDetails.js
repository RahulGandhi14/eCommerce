import { Box, Button, Container, Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import NavBar from '../NavigationBar/NavBar';
import { productRequests } from '../../request';
import { Instance } from '../../axios';
import { isAuthenticated } from '../auth/AuthHelpers';
import { arrayBufferToBase64 } from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions';

const ProductDetails = ({match}) => {

    const user = isAuthenticated();
    const dispatch = useDispatch();
    let productId = match.params.productId;

    const cartProducts = useSelector(state => state.cart.cartProducts);

    const [mainImg, setMainImg] = useState('');
    const [images, setImages] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await Instance.get(`${productRequests.product}/${productId}`,{
            headers: {
                'Authorization': user.token
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });
        if(result && result.data){
            setProductDetails(result.data.data);
            setMainImg(arrayBufferToBase64(result.data.data.img1.data.data));
            let arr = [];
            let keys = [1,2,3,4,5];
            keys.map((key)=>{
                if(result.data.data[`img${key}`]) arr = [...arr, arrayBufferToBase64(result.data.data[`img${key}`].data.data)]
            });
            setImages(arr);
        }
    }

    const productImageSection = () => (
        <>
            <div className="otherImgs">
                {images.map((img)=>(
                    <img src={img} alt="img" onMouseEnter={()=>setMainImg(img)}/>
                ))}
            </div>
            <div className="mainImg-container">
                <img className="mainImg" src={mainImg} alt="mainImg"/>
            </div>
        </>
    )

    const addToCart = () => {
        dispatch(addProduct([...cartProducts, productDetails]));
    }

    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    <Box my={5} className="marginButtonDisable">{console.log("---->selectedSize", selectedSize)}
                        {Object.keys(productDetails).length ? (
                            <Grid container xs={12}>
                                <Grid item lg={6} md={6} sm={12} xs={12} container className="product-imgs">
                                    {productImageSection()}
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <div className="product-details">
                                        <h1>{productDetails?.brandName}</h1>
                                        <h3 className="faded">{productDetails?.productName}</h3>
                                        <div className="horizontal-divider"></div>
                                        <h2>Rs. {productDetails?.sellingPrice} &nbsp; 
                                            <span className="originalPrice">(Rs. {productDetails?.mrp})</span> &nbsp; 
                                            <span className="discount">
                                                ({Math.round(((productDetails?.mrp-productDetails?.sellingPrice)/productDetails?.sellingPrice)*100)}% off)
                                            </span>
                                        </h2>
                                        
                                        <div className="sizes my20">
                                            <h4 className="mb8" style={{fontWeight:"500",textTransform:"uppercase"}}>Select size</h4>
                                            <div className="size-select">
                                                {productDetails?.sizes?.map((size)=>(
                                                    <input type="radio" id={size._id} checked={selectedSize === size._id} onChange={(e)=>setSelectedSize(e.target.id)}/>
                                                ))}
                                                <div className="size-buttons">
                                                    {productDetails?.sizes.map((size)=>(
                                                        <label className={selectedSize===size._id ? 'selected' : ''} htmlFor={size._id}>
                                                            {size.size}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="mb8" style={{fontWeight:"500",textTransform:"uppercase"}}>Product Details</h4>
                                        <p>{productDetails?.description}</p>
                                    </div>
                                    <div className="purchase-buttons">
                                        <Button className="addToCart" variant="contained" onClick={addToCart}>Add to cart</Button>
                                        <Button className="addToWishlist" variant="outlined">Wishlist</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Box>
                </Container>
            </Grid>
        </>
    )
}

export default ProductDetails
