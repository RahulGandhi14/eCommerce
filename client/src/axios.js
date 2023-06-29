import axios from 'axios'

let API =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL
        : 'http://localhost:3001/api'

export const Instance = axios.create({
    baseURL: API,
})

Instance.defaults.headers.get['Accept'] = 'application/json'
Instance.defaults.headers.post['Accept'] = 'application/json'
