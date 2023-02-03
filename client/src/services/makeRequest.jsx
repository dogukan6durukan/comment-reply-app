import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL,
    withCredentials : true
})

export function makeRequest(url, options) {
    return api(url, options).then(url, options)
    .then(res => res.data);
}