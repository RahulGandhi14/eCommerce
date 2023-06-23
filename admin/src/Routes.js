import React, { Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import PageLoader from './components/utils/Loader/PageLoader'
import Customers from './pages/Customers/Customers'
import Dashboard from './pages/Dashboard/Dashboard'
import Orders from './pages/Orders/Orders'
import AddProduct from './pages/Products/AddProduct'
import Products from './pages/Products/Products'
import Settings from './pages/Settings/Settings'

const Routes = () => {
    return (
        <HashRouter>
            <Suspense fallback={<PageLoader />}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/products" exact component={Products} />
                    <Route path="/products/add" exact component={AddProduct} />
                    <Route path="/customers" exact component={Customers} />
                    <Route path="/settings" exact component={Settings} />
                </Switch>
            </Suspense>
        </HashRouter>
    )
}

export default Routes
