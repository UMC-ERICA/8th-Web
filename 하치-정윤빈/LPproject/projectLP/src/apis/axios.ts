import axios, { InternalAxiosRequestConfig } from "axios";

import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig{
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 Promise를 저장해 중복 요청 방지
let refreshPromise:Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_SERVER_API_URL,
    //headers: {
    //    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    //},
});


//요청 인터셉터 : 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다
axiosInstance.interceptors.request.use(
    (config) => {
        const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const accessToken = getItem();
        
        if (accessToken) {
            config.headers = config.headers ||{};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>Promise.reject(error),
);

//401 에러 -> refresh 토큰을 통한 토큰 갱신
axiosInstance.interceptors.response.use(
    (response)=> response,
    async(error)=>{
        const originalRequest:CustominternalAxiosRequestConfig = error.config;

        if(error.response && error.response.status===401 && !originalRequest._retry){
            if(originalRequest.url === '/v1/auth/refresh'){
                const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                removeAccessToken();
                removeRefreshToken();
                window.location.href="/login";
                return Promise.reject(error);
            }
            originalRequest._retry = true;

            //리프레시 요청이 이미 진행 중이라면, 그 promise를 재사용
            if(!refreshPromise){
                //리프레시 요청 실행 후, 프라미스를 전역 변수에 할당
                refreshPromise = (async()=>{
                    const{getItem:getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,);
                    const refreshToken = getRefreshToken();

                    const {data} = await axiosInstance.post("/v1/auth/refresh",{
                        refresh: refreshToken,
                    });

                    //새 토큰 반환
                    const {setItem:setAccessToken} = useLocalStorage(
                        LOCAL_STORAGE_KEY.accessToken,
                    );
                    const {setItem:setRefreshToken} = useLocalStorage(
                        LOCAL_STORAGE_KEY.refreshToken,
                    );
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);
                    //새 accessToken을 반환해 다른 요청들이 이것을 사용할 수 있게 함함
                    return data.data.accessToken;
                })()
                .catch((error)=>{
                    const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const{removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    removeAccessToken();
                    removeRefreshToken();
                    window.location.href ="/login";
                    return Promise.reject(error);
                }).finally(()=>{
                    refreshPromise =null;
                });
            }
            return refreshPromise.then((newAccessToken)=>{
                originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`;
                return axiosInstance.request(originalRequest);
            }).catch((error) => {
                window.location.href = "/login";
                return Promise.reject(error);
            })
            ;
        }
        //401 에러가 아닌 경우 그대로 오류를 반환환
        return Promise.reject(error);
    }
)