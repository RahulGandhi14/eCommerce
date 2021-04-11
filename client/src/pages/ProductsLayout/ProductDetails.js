import { Box, Button, Container, Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import NavBar from '../NavigationBar/NavBar';
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import img1 from "../../assets/product-imgs/shirt.jpeg";
import { productRequests } from '../../request';
import { Instance } from '../../axios';
import { isAuthenticated } from '../auth/AuthHelpers';

const ProductDetails = ({match}) => {

    const user = isAuthenticated();
    let productId = match.params.productId;

    const [mainImg, setMainImg] = useState(shirtImg);
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
        }
    }

    const productImageSection = () => (
        <>
            <div className="otherImgs">
                <img src={img1} alt="img" onMouseEnter={()=>setMainImg(img1)} onMouseLeave={()=>setMainImg(shirtImg)}/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
            </div>
            <div className="mainImg-container">
                <img className="mainImg" src={mainImg} alt="mainImg"/>
            </div>
        </>
    )

    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    <Box my={5} className="marginButtonDisable">
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
                                            <input type="radio" id="size1" checked={selectedSize === 'size1'} onChange={(e)=>setSelectedSize(e.target.id)}/>
                                            <input type="radio" id="size2" checked={selectedSize === 'size2'} onChange={(e)=>setSelectedSize(e.target.id)}/>
                                            <input type="radio" id="size3" checked={selectedSize === 'size3'} onChange={(e)=>setSelectedSize(e.target.id)}/>
                                            <input type="radio" id="size4" checked={selectedSize === 'size4'} onChange={(e)=>setSelectedSize(e.target.id)}/>
                                            <div className="size-buttons">
                                                <label className={selectedSize==='size1' ? 'selected' : ''} htmlFor="size1">1</label>
                                                <label className={selectedSize==='size2' ? 'selected' : ''} htmlFor="size2">2</label>
                                                <label className={selectedSize==='size3' ? 'selected' : ''} htmlFor="size3">3</label>
                                                <label className={selectedSize==='size4' ? 'selected' : ''} htmlFor="size4">4</label>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="mb8" style={{fontWeight:"500",textTransform:"uppercase"}}>Product Details</h4>
                                    <p>{productDetails?.description}</p>
                                </div>
                                <div className="purchase-buttons">
                                    <Button className="addToCart" variant="contained">Add to cart</Button>
                                    <Button className="addToWishlist" variant="outlined">Wishlist</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Grid>
        </>
    )
}

export default ProductDetails
