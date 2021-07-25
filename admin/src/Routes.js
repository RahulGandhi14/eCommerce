import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Orders from './pages/Orders/Orders'
import AddProduct from './pages/Products/AddProduct'
import Products from './pages/Products/Products'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orders" exact component={Orders} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/add" exact component={AddProduct} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
