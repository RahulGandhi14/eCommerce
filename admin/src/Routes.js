import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Orders from './pages/Orders/Orders'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orders" exact component={Orders} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
