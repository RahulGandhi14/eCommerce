import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavigationBar/NavBar';
import "./Cart.scss";
import { useStyles } from "../NavigationBar/NavBar";
import CartProductCard from './CartProductCard';

const Cart = () => {
    const classes = useStyles();

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
                <p className="cursorPointer" style={{fontWeight:"500"}}>Apply coupon</p>
            </div>
            <div className="horizontalDivider"></div>
            <div className="justifiedFlex rowDir my10">
                <h5>Total Amount</h5>
                <p>$ 39</p>
            </div>
            <Button variant="contained" className={classes.btnStyle} fullWidth>Place order</Button>
        </div>
    )

    return (
        <>
            <NavBar />
            <Container style={{overflow:"hidden"}}>
                <Grid lg={10} xs={12} className="marginAuto">
                    <Box mt={5}>
                        <Grid container spacing={6}>
                            <Grid item lg={8} md={8} sm={7} xs={12}>
                                <Grid container justify="space-between">
                                    <h4>My Cart</h4>
                                    <h4>( 2 ) Items</h4>
                                </Grid>
                                <CartProductCard />
                                <CartProductCard />
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
