import axios from "axios";

export const api = axios.create({
    baseURL: `https://four-2-real-time.onrender.com/`,
    withCredentials: true
})