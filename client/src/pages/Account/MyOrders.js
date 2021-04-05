import { Box } from '@material-ui/core';
import React from 'react';
import CartProductCard from '../Checkout/CartProductCard';

const MyOrders = () => {
    return (
        <Box p={3}>
            <p>Showing <span className="fw500">All Orders</span></p>
            <CartProductCard />
        </Box>
    )
}

export default MyOrders
