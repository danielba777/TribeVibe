import axios from "axios"

export const makeRequest = axios.create({
    baseURL: "https://tribevibe.onrender.com/api/",
    withCredentials: true,
}) 