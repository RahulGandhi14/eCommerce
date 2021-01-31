import React from 'react';
import "./style.css"
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from "./App"
import Signup from './pages/auth/Signup';

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/sign-up" exact component={Signup} />
            </Switch>
        </HashRouter>
    )
}

export default Routes
