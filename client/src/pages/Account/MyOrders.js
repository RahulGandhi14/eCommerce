import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Instance } from '../../axios';
import { productRequests } from '../../request';
import { isAuthenticated } from '../auth/AuthHelpers';
import CartProductCard from '../Checkout/CartProductCard';

const MyOrders = () => {

    const user = isAuthenticated();
    
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        let result = await Instance.get(productRequests.product, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });

        if(result && result.data) {
            setAllProducts(result.data.data);
        }
    }

    return (
        <Box p={3}>
            <p>Showing <span className="fw500">All Orders</span></p>
            {allProducts?.map((product)=><CartProductCard data={product}/>)}
        </Box>
    )
}

export default MyOrders
