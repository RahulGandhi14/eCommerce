import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import NavBar from '../NavigationBar/NavBar'
import './Cart.scss'
import { useStyles } from '../NavigationBar/NavBar'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../auth/AuthHelpers'
import { useHistory } from 'react-router'
import Bag from './Bag'
import Addresses from '../Account/Addresses'
import Stripe from '../Stripe/Stripe'
import EmptyCart from './EmptyCart'

const Cart = () => {
    const classes = useStyles()
    const user = isAuthenticated()
    const history = useHistory()

    //REDUX states
    const cartProducts = useSelector((state) => state.cart.cartProducts)
    const deliveryAddress = useSelector((state) => state.cart.deliveryAddress)

    //REACT states
    const [currentTab, setCurrentTab] = useState(1)

    let totalMRP = 0,
        totalSellingPrice = 0
    cartProducts.map((product) => {
        totalMRP += product.mrp * product.qty
        totalSellingPrice += product.sellingPrice * product.qty
    })

    useEffect(() => {
        if (currentTab === 2) setCurrentTab(3)
    }, [deliveryAddress])

    const placeOrder = async () => {
        if (!user) history.push('/auth')
        setCurrentTab((prevState) => prevState + 1)
    }

    const priceDetailsUI = () => (
        <div className="priceDetails">
            <div className="justifiedFlex rowDir mb8">
                <p>Total MRP</p>
                <p>&#8377; {totalMRP}</p>
            </div>
            <div className="justifiedFlex rowDir mb8">
                <p>Discount on MRP</p>
                <p>- &#8377; {totalMRP - totalSellingPrice}</p>
            </div>
            <div className="justifiedFlex rowDir mb8">
                <p>Delivery charges</p>
                <p>Free</p>
            </div>
            <div className="justifiedFlex rowDir">
                <p>Coupon discount</p>
                <p className="cursorPointer" style={{ fontWeight: '500' }}>
                    Apply coupon
                </p>
            </div>
            <div className="horizontalDivider"></div>
            <div className="justifiedFlex rowDir my10">
                <h5>Total Amount</h5>
                <h5>&#8377; {totalSellingPrice}</h5>
            </div>
            {currentTab === 1 && (
                <Button
                    variant="contained"
                    className={classes.btnStyle}
                    onClick={placeOrder}
                    fullWidth
                >
                    {user
                        ? currentTab === 1
                            ? 'Place order'
                            : 'Continue'
                        : 'Login to place order'}
                </Button>
            )}
        </div>
    )

    return (
        <>
            <NavBar />
            {cartProducts.length ? (
                <>
                    <Grid container justify="center" className="my20">
                        <p style={{ fontSize: '14px', letterSpacing: '2px' }}>
                            <span
                                className={`${
                                    currentTab === 1 ? 'fw600' : ''
                                } ${currentTab > 1 ? 'cursorPointer' : ''}`}
                                onClick={() => {
                                    if (currentTab > 1) setCurrentTab(1)
                                }}
                            >
                                BAG
                            </span>
                            &nbsp;-------&nbsp;
                            <span
                                className={`${
                                    currentTab === 2 ? 'fw600' : ''
                                } ${currentTab > 2 ? 'cursorPointer' : ''}`}
                                onClick={() => {
                                    if (currentTab > 2) setCurrentTab(2)
                                }}
                            >
                                ADDRESS
                            </span>
                            &nbsp;-------&nbsp;
                            <span
                                className={`${currentTab === 3 ? 'fw600' : ''}`}
                                onClick={() => {
                                    if (currentTab > 3) setCurrentTab(3)
                                }}
                            >
                                PAYMENT
                            </span>
                        </p>
                    </Grid>
                    <Container style={{ overflow: 'hidden' }}>
                        <Grid lg={10} xs={12} className="marginAuto">
                            <Box mt={5}>
                                {cartProducts.length ? (
                                    <Grid container spacing={6}>
                                        <Grid item lg={8} md={8} sm={7} xs={12}>
                                            {currentTab === 1 ? (
                                                <Bag />
                                            ) : currentTab === 2 ? (
                                                <Addresses displayFor="cart" />
                                            ) : currentTab === 3 ? (
                                                <Stripe
                                                    amount={totalSellingPrice}
                                                />
                                            ) : null}
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
            ) : (
                <EmptyCart param="bag" />
            )}
        </>
    )
}

export default Cart
