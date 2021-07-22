import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Table from './components/Table'
import Dashboard from './pages/Dashboard/Dashboard'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/demo" component={Table} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
