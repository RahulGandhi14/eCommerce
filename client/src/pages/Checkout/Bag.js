import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartProductCard from './CartProductCard';

const Bag = () => {

    const cartProducts = useSelector(state => state.cart.cartProducts);

    return (
        <>
            <Grid container justify="space-between">
                <h4>My Cart</h4>
                <h4>( {cartProducts.length} ) Items</h4>
            </Grid>
            {cartProducts.map((cartProduct)=><CartProductCard data={cartProduct} />)}
        </>
    )
}

export default Bag;
