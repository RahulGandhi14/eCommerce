import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';
import emptyCart from '../../assets/emptyCartIcon.svg';

const EmptyCart = ({param}) => {
    return (
        <Grid container justify="center" alignItems="center" className="h100">
            <Box pt={8}>
                <div className="text-center">
                    <img style={{width:"90%", height:"auto"}} src={emptyCart} alt="empty-cart"/>
                    <p className="my10 faded">There is nothing in your {param}.</p>
                    <Link to="/"><Button variant="outlined">Let's add some items</Button></Link>
                </div>
            </Box>
        </Grid>
    )
}

export default EmptyCart
