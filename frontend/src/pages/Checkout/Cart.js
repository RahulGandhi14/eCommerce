import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavigationBar/NavBar';
import "./Cart.scss";
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import { useStyles } from "../NavigationBar/NavBar"

const Cart = () => {
    const classes = useStyles();

    const productCard = () => (
        <Grid container direction="column" className="cart-item" xs={12}>
            <div className="cart-info">
                <div className="productImg">
                    <img src={shirtImg} alt="product-img"/>
                </div>
                <div className="cart-product-info">
                    <div className="justifiedFlex">
                        <h4 className="textWrap">Highlander</h4>
                        <h4>$ 49</h4>
                    </div>
                    <p>Men slip fit casual shirt</p>
                    <p className="faded">Sold by: RetailNet</p>
                </div>
            </div>
            <div className="cart-action">
                <Grid container className="btnGroup">
                    <div className="removeBtn">
                        <Button>Remove</Button>
                    </div>
                    <div className="divider"></div>
                    <div className="wishlistBtn">
                        <Button>Move to wishlist</Button>
                    </div>
                </Grid>
            </div>
        </Grid>
    )

    const priceDetailsUI = () => (
        <div className="priceDetails">
            <div className="justifiedFlex rowDir mb8">
                <p>Total MRP</p>
                <p>$ 49</p>
            </div>
            <div className="justifiedFlex rowDir mb8">
                <p>Discount on MRP</p>
                <p>- $ 10</p>
            </div>
            <div className="justifiedFlex rowDir mb8">
                <p>Delivery charges</p>
                <p>Free</p>
            </div>
            <div className="justifiedFlex rowDir">
                <p>Coupon discount</p>
                <p className="cursorPointer">Apply coupon</p>
            </div>
            <div className="horizontalDivider"></div>
            <div className="justifiedFlex rowDir my10">
                <h5>Total Amount</h5>
                <p>$ 49</p>
            </div>
            <Button variant="contained" className={classes.btnStyle} fullWidth>Place order</Button>
        </div>
    )

    return (
        <>
            <NavBar />
            <Container>
                <Grid lg={10} className="marginAuto">
                    <Box mt={5}>
                        <Grid container item spacing={6}>
                            <Grid item lg={8} md={8} sm={7} xs={12}>
                                <Grid container justify="space-between">
                                    <h4>My Cart</h4>
                                    <h4>( 2 ) Items</h4>
                                </Grid>
                                {productCard()}
                                {productCard()}
                            </Grid>
                            <Grid item lg={4} md={4} sm={5} xs={12}>
                                <h4>Price Details:</h4>
                                {priceDetailsUI()}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default Cart;
