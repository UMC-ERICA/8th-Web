import axios from "axios";

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "accessToken",
} as const;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
  },
});