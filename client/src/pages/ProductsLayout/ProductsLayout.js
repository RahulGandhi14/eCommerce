import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavigationBar/NavBar';
import ProductCard from './ProductCard';
import "./ProductsLayout.scss";

export const ProductsLayout = () => {
    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    <Grid className="products" container xs={12}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </Grid>
                </Container>
            </Grid>
        </>
    )
}
