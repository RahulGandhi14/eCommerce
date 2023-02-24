import React, { Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import PageLoader from './components/utils/Loader/PageLoader'

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Orders = React.lazy(() => import('./pages/Orders/Orders'))
const AddProduct = React.lazy(() => import('./pages/Products/AddProduct'))
const Products = React.lazy(() => import('./pages/Products/Products'))
const Customers = React.lazy(() => import('./pages/Customers/Customers'))
const Settings = React.lazy(() => import('./pages/Settings/Settings'))

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
