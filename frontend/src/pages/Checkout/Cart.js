import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavigationBar/NavBar';
import "./Cart.scss";
import shirtImg from "../../assets/product-imgs/shirt.jpeg";

const Cart = () => {
    return (
        <>
            <NavBar />
            <Container>
                <Grid lg={10} className="marginAuto">
                    <Box mt={5}>
                        <Grid container item spacing={6}>
                            <Grid item lg={8}>
                                <Grid container justify="space-between">
                                    <h4>My Cart</h4>
                                    <h4>( 2 ) Items</h4>
                                </Grid> 
                                <div className="cart-item">
                                    <img src={shirtImg} alt="product-img"/>
                                    <div className='cart-product-info'>
                                        <h3>Nike</h3>
                                        <p>Men slip fit casual shirt</p>
                                        <p className="faded">Sold by: Retail net</p>
                                        <div className="cart-action">
                                            <Button className="removeBtn">Remove</Button>
                                            <Button className="wishlistBtn">Move to wishlist</Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={4}>
                                <h4>Price Details:</h4>
                                {/* <div className="">Hello</div> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default Cart;
