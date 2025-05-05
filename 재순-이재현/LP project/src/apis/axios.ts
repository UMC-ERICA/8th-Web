import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    headers: any;
    url: string;
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}
// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true, //쿠키를 포함한 요청을 허용한다.
});

//요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem(); //localStorage에서 accessToken을 가져온다.

  //accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
  if (accessToken) {
    config.headers = config.headers || {}; //config.headers가 undefined일 수 있으므로 초기화한다.
    config.headers.Authorization = `Bearer ${accessToken}`; //Authorization 헤더에 accessToken을 추가한다.
  }

  //수정된 요청 설정을 반환한다.
  return config;
}, 
//요청 인터셉터가 실패하면, 에러 도출.
 (error) => Promise.reject(error),
);

//응답 인터셉터: 401에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리한다.
axiosInstance.interceptors.response.use(
  (response) => response, //응답이 성공하면 응답을 그대로 반환한다.
  async (error) => {
    const originalRequest = error.config as CustominternalAxiosRequestConfig; //오류가 발생한 요청을 가져온다.

    //401 에러면서, 아직 재시도하지 않은 경우
    if (error.response && error.response.status=== 401 && !originalRequest._retry 
    ) {
        if (originalRequest.url === "/v1/auth/refresh") {
            //refresh 요청이 실패하면, 로그아웃 처리한다.
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken(); //localStorage에서 accessToken을 제거한다.
            removeRefreshToken(); //localStorage에서 refreshToken을 제거한다.
            window.location.href = "/login"; //로그인 페이지로 리다이렉트한다.
            return Promise.reject(error); //에러를 반환한다.
        }

        //재시도 플래그 실행
        originalRequest._retry = true; //재시도 플래그를 true로 설정한다.

        // 이미 refresh 요청이 진행 중인 경우, 해당 Promise를 기다린다.
        if (!refreshPromise) {
            // refresh 요청 실행 후, promise를 전역 변수에 할당.
            refreshPromise = (async () => {
                const { getItem:getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                const refreshToken = getRefreshToken(); //localStorage에서 refreshToken을 가져온다.
                const { data } = await axiosInstance.post("/v1/auth/refresh", {
                    refresh: refreshToken,
                });
                //새 토큰이 반환환
                const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                setAccessToken(data.data.accessToken); //localStorage에 accessToken을 저장한다.
                setRefreshToken(data.data.refreshToken); //localStorage에 refreshToken을 저장한다.
                return data.data.accessToken; //새로운 accessToken을 반환한다. -> 다른 요청들이 이것을 사용할 수 있게 함.
    })()
    .catch((_error) => {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken(); //localStorage에서 accessToken을 제거한다.
        removeRefreshToken(); //localStorage에서 refreshToken을 제거한다.
    }).finally(() => {
        refreshPromise = null;
    });
}

//진행중인 refreshPromise가 해결될 때까지 기다린다.
    return refreshPromise?.then((newAccessToken) => {
        //원본 요청의 Authorization 헤더를 newAccessToken으로 업데이트한다.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; //새로운 accessToken을 Authorization 헤더에 추가한다.
        //업데이트된 요청을 재시도한다.
        return axiosInstance(originalRequest); //원래 요청을 재시도한다.
    });
    }
    //401 에러가 아닌 경우, 에러를 그대로 반환한다.
    return Promise.reject(error);
},
);
