import axios from 'axios';

export const request = axios.create({
    baseURL: process.env.REACT_APP_API_END_POINT,
    timeout: 15000,
});