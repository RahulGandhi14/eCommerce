import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavigationBar/NavBar';
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import img1 from "../../assets/product-imgs/shirt.jpeg";

const ProductDetails = () => {

    const productImageSection = () => (
        <>
            <div className="otherImgs">
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
                <img src={img1} alt="img"/>
            </div>
            <div className="mainImg-container">
                <img className="mainImg" src={img1} alt="mainImg"/>
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
                            <Grid item lg={6} container className="product-imgs">
                                {productImageSection()}
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Grid>
        </>
    )
}

export default ProductDetails
