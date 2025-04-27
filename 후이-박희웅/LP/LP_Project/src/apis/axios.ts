import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url?.includes("/v1/auth/refresh")) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
          if (!refreshToken) throw new Error("No refresh token");

          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/v1/auth/refresh`, { refreshToken });

          if (data?.data?.accessToken && data?.data?.refreshToken) {
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.data.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, data.data.refreshToken);
          } else {
            throw new Error("Refresh 응답에 토큰이 없습니다. 다시 로그인하세요.");
          }

          return data.data.accessToken;
        })().catch((refreshError) => {
          console.error("❌ refreshToken 실패:", refreshError);
          localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          throw refreshError;
        }).finally(() => {
          refreshPromise = null;
        });
      }

      try {
        const newAccessToken = await refreshPromise;
        const retryRequest = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };
        return axiosInstance(retryRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
