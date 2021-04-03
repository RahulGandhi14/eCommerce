import React from 'react';
import "./style.css"
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ProductsLayout } from './pages/ProductsLayout/ProductsLayout';
import Cart from './pages/Checkout/Cart';
import ProductDetails from './pages/ProductsLayout/ProductDetails';
import Auth from './pages/auth/Auth';
import { isAuthenticated } from './pages/auth/AuthHelpers';

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

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={ (props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect 
                        to={{
                            pathname: "/auth",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default Routes
