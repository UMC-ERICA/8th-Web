import axios, {AxiosInstance} from "axios";
import {LOCAL_STORAGE_KEY} from "../constants/key.ts";


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
});
