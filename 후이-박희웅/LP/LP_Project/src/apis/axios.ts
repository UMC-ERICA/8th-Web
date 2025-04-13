import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accessToken = getItem();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  }
)

export default axiosInstance;