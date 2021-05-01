import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import NavBar from '../NavigationBar/NavBar';
import ProductCard from './ProductCard';
import "./ProductsLayout.scss";
import { productRequests, wishlistRequests } from '../../request';
import { Instance } from '../../axios';
import { isAuthenticated } from '../auth/AuthHelpers';
import Loader from '../Loader';
import EmptyCart from '../Checkout/EmptyCart';
import { toast } from 'react-toastify';

export const ProductsLayout = () => {

    const user = isAuthenticated();
    let url = window.location.hash;
    
    const [isLoading, setIsLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [wishlistedProducts, setWishlistedProducts] = useState([]);

    useEffect(() => {
        if(url === '#/') getAllProducts();
        getAllWishlistProducts();
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

    const getAllWishlistProducts = async () => {
        setIsLoading(true);
        let requestURL = wishlistRequests.wishlist;
        if(url !== '#/wishlist') requestURL += '?for=products'
        let result = await Instance.get(requestURL, {
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
            if(url === '#/wishlist') {
                setAllProducts(result.data.data?.products ? result.data.data.products : []);
            } else {
                setWishlistedProducts(result.data.data);
            }
        }
        setIsLoading(false);
    }

    const removeFromWishlist = async (productId) => {
        let result = await Instance.delete(`${wishlistRequests.wishlist}/${productId}`, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });

        if(result && result.data) {
            setAllProducts(result.data.data?.products ? result.data.data.products : []);
            toast.dark('Item removed from wishlist');
        }
    }

    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    {isLoading ? (
                        <Loader />
                    ) : allProducts.length ? (
                        <Grid className="products" container xs={12}>
                            {allProducts.map((product)=>
                                <ProductCard 
                                    productDetails={product} 
                                    removeFromWishlist={removeFromWishlist} 
                                    wishlistedProducts={wishlistedProducts}
                                    setWishlistedProducts={setWishlistedProducts}
                                />
                            )}
                        </Grid>
                    ) : (
                        <EmptyCart param="wishlist"/>
                    )}
                </Container>
            </Grid>
        </>
    )
}
