import axios from 'axios';

export const Instance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

Instance.defaults.headers.get['Accept'] = 'application/json';
Instance.defaults.headers.post['Accept'] = 'application/json';