import { Container, Grid, Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import AddEditProduct from '../Admin/AddEditProduct'
import { isAuthenticated } from '../auth/AuthHelpers'
import NavBar from '../NavigationBar/NavBar'
import './Account.scss'
import Addresses from './Addresses'
import MyOrders from './MyOrders'
import Profile from './Profile'

const Account = ({ match }) => {
    let user = isAuthenticated()
    let history = useHistory()
    let windowWidth = useWindowSize()
    const [currentTab, setCurrentTab] = useState(match.params.stage)

    useEffect(() => {
        history.push(`/account/${currentTab}`)
    }, [currentTab, match.params.stage])

    return (
        <>
            <NavBar />
            <Container style={{ overflow: 'hidden' }}>
                <Grid lg={10} xs={12} className="marginAuto">
                    <Box mt={5}>
                        <div>
                            <h3>Account</h3>
                            <p style={{ fontSize: '14px' }}>{user.name}</p>
                        </div>
                        <Grid container className="accountSection">
                            {windowWidth > 599 ? (
                                <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={3}
                                    className="accountItems"
                                >
                                    <Box mt={3} className="items">
                                        <div>
                                            <p
                                                className={`fw500 cursorPointer ${
                                                    currentTab === 'orders'
                                                        ? 'activeLink'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    setCurrentTab('orders')
                                                }
                                            >
                                                Orders
                                            </p>
                                        </div>
                                        <div>
                                            <p className="fw500">Account</p>
                                            <div className="accountLinks">
                                                <p
                                                    className={`cursorPointer ${
                                                        currentTab === 'profile'
                                                            ? 'activeLink'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        setCurrentTab('profile')
                                                    }
                                                >
                                                    Profile
                                                </p>
                                                <p
                                                    className={`cursorPointer ${
                                                        currentTab === 'address'
                                                            ? 'activeLink'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        setCurrentTab('address')
                                                    }
                                                >
                                                    Addresses
                                                </p>
                                                <p
                                                    className={`cursorPointer ${
                                                        currentTab ===
                                                        'wishlist'
                                                            ? 'activeLink'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        setCurrentTab(
                                                            'wishlist'
                                                        )
                                                    }
                                                >
                                                    <Link
                                                        to="/wishlist"
                                                        style={{
                                                            color: '#1d256e',
                                                        }}
                                                    >
                                                        Wishlist
                                                    </Link>
                                                </p>
                                                {user?.role === 1 && (
                                                    <p
                                                        className={`cursorPointer ${
                                                            currentTab ===
                                                            'addProduct'
                                                                ? 'activeLink'
                                                                : ''
                                                        }`}
                                                        onClick={() =>
                                                            setCurrentTab(
                                                                'addProduct'
                                                            )
                                                        }
                                                    >
                                                        Add Product
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Box>
                                </Grid>
                            ) : (
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    className="mt10"
                                >
                                    <p
                                        className={`cursorPointer ${
                                            currentTab === 'profile'
                                                ? 'activeLink'
                                                : ''
                                        }`}
                                        onClick={() => setCurrentTab('profile')}
                                    >
                                        Profile
                                    </p>
                                    <p
                                        className={`cursorPointer ${
                                            currentTab === 'address'
                                                ? 'activeLink'
                                                : ''
                                        }`}
                                        onClick={() => setCurrentTab('address')}
                                    >
                                        Addresses
                                    </p>
                                    <p
                                        className={`cursorPointer ${
                                            currentTab === 'orders'
                                                ? 'activeLink'
                                                : ''
                                        }`}
                                        onClick={() => setCurrentTab('orders')}
                                    >
                                        Orders
                                    </p>
                                </Grid>
                            )}
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={9}
                                style={{ width: 'inherit' }}
                            >
                                <Box p={3} className="removePadding">
                                    {currentTab === 'profile' ? (
                                        <Profile />
                                    ) : currentTab === 'orders' ? (
                                        <MyOrders />
                                    ) : currentTab === 'address' ? (
                                        <Addresses displayFor="account" />
                                    ) : currentTab === 'addProduct' ? (
                                        <AddEditProduct />
                                    ) : null}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default Account
