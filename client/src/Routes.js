import React from 'react';
import "./style.css"
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ProductsLayout } from './pages/ProductsLayout/ProductsLayout';
import Cart from './pages/Checkout/Cart';
import ProductDetails from './pages/ProductsLayout/ProductDetails';
import Auth from './pages/auth/Auth';

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={ProductsLayout} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/product" exact component={ProductDetails} />
                <Route path="/checkout/cart" exact component={Cart} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
