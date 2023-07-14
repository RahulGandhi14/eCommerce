import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory'
import './style.scss'

ReactDOM.render(
    <BrowserRouter>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </BrowserRouter>,
    document.getElementById('root')
)
