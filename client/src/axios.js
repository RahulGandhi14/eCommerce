import axios from 'axios';

let API = 'https://fierce-peak-87716.herokuapp.com/api';

export const Instance = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: API
});

Instance.defaults.headers.get['Accept'] = 'application/json';
Instance.defaults.headers.post['Accept'] = 'application/json';