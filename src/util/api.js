import { message } from 'antd';
import axios from 'axios';
import { store } from '../index';

const api = axios.create(
    {
        baseURL: "http://localhost:7000",
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);
api.interceptors.response.use((response) => {
    return response
}, (err) => {
    if (err?.response?.status === 401) {
        message.error(err?.response?.data?.message)
        return window.location.href = "/"
    }
})

export default api;