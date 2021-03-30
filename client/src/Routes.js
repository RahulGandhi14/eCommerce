import React from 'react';
import "./style.css"
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from "./App"
import Signup from './pages/auth/Signup';
import { ProductsLayout } from './pages/ProductsLayout/ProductsLayout';
import Cart from './pages/Checkout/Cart';
import ProductDetails from './pages/ProductsLayout/ProductDetails';

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={ProductsLayout} />
                <Route path="/sign-up" exact component={Signup} />
                <Route path="/product" exact component={ProductDetails} />
                <Route path="/checkout/cart" exact component={Cart} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
