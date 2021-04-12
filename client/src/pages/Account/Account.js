import { Container, Grid, Box } from '@material-ui/core';
import React, { useState } from 'react';
import AddEditProduct from '../Admin/AddEditProduct';
import { isAuthenticated } from '../auth/AuthHelpers';
import NavBar from '../NavigationBar/NavBar';
import "./Account.scss";
import Addresses from './Addresses'
import MyOrders from './MyOrders'
import Profile from './Profile'

const Account = () => {

    let user = isAuthenticated();
    const [currentTab, setCurrentTab] = useState('profile');

    return (
        <>
            <NavBar />
            <Container style={{overflow:"hidden"}}>
                <Grid lg={10} xs={12} className="marginAuto">
                    <Box mt={5}>
                        <div>
                            <h3>Account</h3>
                            <p style={{fontSize:"14px"}}>{user.name}</p>
                        </div>
                        <Grid container className="accountSection">
                            <Grid item lg={2} className="accountItems">
                                <Box mt={3} className="items">
                                    <div>
                                        <p 
                                            className={`fw500 cursorPointer ${currentTab==='orders' ? 'activeLink' : ''}`}
                                            onClick={()=>setCurrentTab("orders")}
                                        >Orders</p>
                                    </div>
                                    <div>
                                        <p className="fw500">Account</p>
                                        <div className="accountLinks">
                                            <p 
                                                className={`cursorPointer ${currentTab==='profile' ? 'activeLink' : ''}`}
                                                onClick={()=>setCurrentTab("profile")}
                                            >Profile</p>
                                            <p
                                                className={`cursorPointer ${currentTab==='address' ? 'activeLink' : ''}`}
                                                onClick={()=>setCurrentTab("address")} 
                                            >Addresses</p>
                                            <p
                                                className={`cursorPointer ${currentTab==='addProduct' ? 'activeLink' : ''}`}
                                                onClick={()=>setCurrentTab("addProduct")} 
                                            >Add Product</p>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item lg={10}>
                                {
                                    currentTab==='profile' ? <Profile /> :
                                    currentTab==='orders' ? <MyOrders /> :
                                    currentTab==='address' ? <Addresses /> : 
                                    currentTab==='addProduct' ? <AddEditProduct /> : null
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default Account