import React from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import NavBar from '../NavigationBar/NavBar';
import "./Cart.scss";
import { useStyles } from "../NavigationBar/NavBar";
import CartProductCard from './CartProductCard';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../auth/AuthHelpers';
import { useHistory } from 'react-router';

const Cart = () => {
    const classes = useStyles();
    const user = isAuthenticated();
    const history = useHistory();

    //REDUX states
    const cartProducts = useSelector(state => state.cart.cartProducts);

    //REACT states

    let totalMRP = 0, totalSellingPrice = 0;
    cartProducts.map((product) => {totalMRP += product.mrp*product.qty; totalSellingPrice += product.sellingPrice*product.qty});

    const placeOrder = async () => {
        if(!user) history.push('/auth');
    }

    const priceDetailsUI = () => (
        <div className="priceDetails">
            <div className="justifiedFlex rowDir mb8">
                <p>Total MRP</p>
                <p>&#8377; {totalMRP}</p>
            </div>
            <div className="justifiedFlex rowDir mb8">
                <p>Discount on MRP</p>
                <p>- &#8377; {totalMRP-totalSellingPrice}</p>
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
                <p>&#8377; {totalSellingPrice}</p>
            </div>
            <Button variant="contained" className={classes.btnStyle} onClick={placeOrder} fullWidth>
                {user ? 'Place order' : 'Login to place order'}
            </Button>
        </div>
    )

    return (
        <>
            <NavBar />
            <Container style={{overflow:"hidden"}}>
                <Grid lg={10} xs={12} className="marginAuto">
                    <Box mt={5}>
                        {cartProducts.length ? (
                            <Grid container spacing={6}>
                                <Grid item lg={8} md={8} sm={7} xs={12}>
                                    <Grid container justify="space-between">
                                        <h4>My Cart</h4>
                                        <h4>( {cartProducts.length} ) Items</h4>
                                    </Grid>
                                    {cartProducts.map((cartProduct)=><CartProductCard data={cartProduct} />)}
                                </Grid>
                                <Grid item lg={4} md={4} sm={5} xs={12}>
                                    <h4>Price Details:</h4>
                                    {priceDetailsUI()}
                                </Grid>
                            </Grid>
                        ) : null}
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default Cart;
