import { Box, Button, Container, Grid } from '@material-ui/core';
import React, {useState} from 'react';
import NavBar from '../NavigationBar/NavBar';
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import img1 from "../../assets/product-imgs/shirt.jpeg";

const ProductDetails = () => {

    const [mainImg, setMainImg] = useState(shirtImg)

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
                    <Box my={5}>
                        <Grid container xs={12}>
                            <Grid item lg={6} md={6} sm={12} xs={12} container className="product-imgs">
                                {productImageSection()}
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div className="product-details">
                                    <h1>HIGHLANDER</h1>
                                    <h3 className="faded">Full Sleeve shirt</h3>
                                    <div className="horizontal-divider"></div>
                                    <h2>Rs. 504 &nbsp; 
                                        <span className="originalPrice">(Rs. 999)</span> &nbsp; 
                                        <span className="discount">(50% off)</span>
                                    </h2>
                                    
                                    <div className="sizes my20">
                                        <h4 className="mb8" style={{fontWeight:"500",textTransform:"uppercase"}}>Select size</h4>
                                        <div className="size-select">
                                            <input type="radio" name="size" id="size1" value="size1" onChange={(e)=>console.log("-->",e.target.value)}/>
                                            <input type="radio" name="size" id="size2" value="size2" onChange={(e)=>console.log("-->",e.target.value)}/>
                                            <input type="radio" name="size" id="size3" value="size3" onChange={(e)=>console.log("-->",e.target.value)}/>
                                            <input type="radio" name="size" id="size4" value="size4" onChange={(e)=>console.log("-->",e.target.value)}/>
                                            <div className="size-buttons">
                                                <label htmlFor="size1">1</label>
                                                <label htmlFor="size2">2</label>
                                                <label htmlFor="size3">3</label>
                                                <label htmlFor="size4">4</label>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="mb8" style={{fontWeight:"500",textTransform:"uppercase"}}>Product Details</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio tempore harum officiis dolorum illo dicta mollitia ratione, delectus alias earum suscipit ipsum, fugiat voluptatum optio iusto voluptatem nulla exercitationem!</p>
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
