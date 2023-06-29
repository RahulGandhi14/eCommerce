import axios from 'axios'
import { isAuthenticated } from './auth/AuthHelper'

export const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3001/api'
            : process.env.REACT_APP_API_URL,
})

axiosInstance.defaults.headers.get['Accept'] = 'application/json'
axiosInstance.defaults.headers.post['Accept'] = 'application/json'

const token = isAuthenticated()
if (token) {
    axiosInstance.defaults.headers.get['Authorization'] = token
    axiosInstance.defaults.headers.post['Authorization'] = token
}
