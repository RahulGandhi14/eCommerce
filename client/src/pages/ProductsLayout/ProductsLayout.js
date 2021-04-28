import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import NavBar from '../NavigationBar/NavBar';
import ProductCard from './ProductCard';
import "./ProductsLayout.scss";
import { productRequests } from '../../request';
import { Instance } from '../../axios';
import { isAuthenticated } from '../auth/AuthHelpers';
import Loader from '../Loader';

export const ProductsLayout = () => {

    const user = isAuthenticated();
    
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        setIsLoading(true);
        let result = await Instance.get(productRequests.product, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                setIsLoading(false);
                console.log("--->Error",error)
            }
        });

        if(result && result.data) {
            setAllProducts(result.data.data);
        }
        setIsLoading(false);
    }

    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Grid className="products" container xs={12}>
                            {allProducts.map((product)=><ProductCard productDetails={product}/>)}
                        </Grid>
                    )}
                </Container>
            </Grid>
        </>
    )
}
