import React from 'react'
import './style.css'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ProductsLayout } from './pages/ProductsLayout/ProductsLayout'
import Cart from './pages/Checkout/Cart'
import ProductDetails from './pages/ProductsLayout/ProductDetails'
import Auth from './pages/auth/Auth'
import { isAuthenticated } from './pages/auth/AuthHelpers'
import Account from './pages/Account/Account'
import 'react-toastify/dist/ReactToastify.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated()?.role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={ProductsLayout} />
                <Route path="/auth" exact component={Auth} />
                <Route
                    path="/product/:productId"
                    exact
                    component={ProductDetails}
                />
                <Route path="/checkout/cart" exact component={Cart} />
                <PrivateRoute
                    path="/account/:stage"
                    exact
                    component={Account}
                />
                <PrivateRoute
                    path="/wishlist"
                    exact
                    component={ProductsLayout}
                />
            </Switch>
        </HashRouter>
    )
}

export default Routes
