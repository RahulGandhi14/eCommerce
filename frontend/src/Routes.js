import React from 'react';
import "./style.css"
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from "./App"
import Signup from './pages/auth/Signup';
import { ProductsLayout } from './pages/ProductsLayout/ProductsLayout';
import Cart from './pages/Checkout/Cart';

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={ProductsLayout} />
                <Route path="/sign-up" exact component={Signup} />
                <Route path="/checkout/cart" exact component={Cart} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
