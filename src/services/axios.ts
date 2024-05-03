import axios from "axios";
const BASE_URL = 'https://norma.nomoreparties.space/api';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})