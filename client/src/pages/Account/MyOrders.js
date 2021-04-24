import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Instance } from '../../axios';
import { orderRequests } from '../../request';
import { isAuthenticated } from '../auth/AuthHelpers';
import CartProductCard from '../Checkout/CartProductCard';
import { arrayBufferToBase64 } from '../util';

const MyOrders = () => {

    const user = isAuthenticated();
    
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        let result = await Instance.get(orderRequests.Order, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });
        if(result && result.data) {
            let orders = result.data.data.map((order)=>{
                let productArr = order.products.map((product)=>{
                    [1,2,3,4,5].map((index)=>{
                        if(product.product[`img${index}`]) {
                            product.product[`img${index}`] = arrayBufferToBase64(product.product[`img${index}`]?.data?.data);
                        }
                    });
                    product.product.qty = product.qty;
                    product.product.selectedSize = product.size.size;
                    return product;
                });
                order.products = productArr;
                return order
            })
            setAllProducts(orders);
        }
    }

    return (
        <Box p={3}>
            <p>Showing <span className="fw500">All Orders</span></p>
            {allProducts.map((order)=>(
                <div className="order-container mb20">
                    <p>Order Id: {order._id}</p>
                    {order.products.map(product => (
                        <CartProductCard data={product.product} product={product} status={order.status}/>
                    ))}
                </div>
            ))}
        </Box>
    )
}

export default MyOrders
