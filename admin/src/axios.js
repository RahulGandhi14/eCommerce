import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3001/api'
            : process.env.REACT_APP_API_URL,
})

axiosInstance.defaults.headers.get['Accept'] = 'application/json'
axiosInstance.defaults.headers.post['Accept'] = 'application/json'
