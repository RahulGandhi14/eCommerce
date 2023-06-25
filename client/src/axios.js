import axios from 'axios'

let API = 'https://ecom-app-rahul-gandhi.onrender.com/api'

export const Instance = axios.create({
    baseURL: API,
})

Instance.defaults.headers.get['Accept'] = 'application/json'
Instance.defaults.headers.post['Accept'] = 'application/json'
