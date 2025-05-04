// 1. 준비
/* “axios와 타입들, localStorage 키를 불러오고, 요청 설정을 확장한 커스텀 타입을 만들었으며,
refreshToken 갱신용 Promise를 초기화해, 401 에러 발생 대비 준비를 끝냈습니다.” */
import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 이 요청이 재시도된 요청인지 여부를 나타내는 플래그 만약 서버에서 401 에러가 발생하면 이 요청을 재시도하기 위해 사용됩니다.
}

let refreshPromise: Promise<string> | null = null;

// 2. axiosInstance를 생성합니다. 
/* axios는 비동긴데 무조건 promise{}라는 객체를 반환함.
  그 promise객체는 결과가 나올지 확실하지 않은 것이기 때문에 promise{}로 감싸는건데
  그래서 await가 필요한거임. await는 promise{}가 끝날때까지 기다리라는거임.
  만약 에러없이 실행되는거다? 그러면 객체 안에 리얼데이터를 쏙 꺼내서 반환해주는거임*/
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 3. 요청 인터셉터를 추가합니다.
/* interceptors라는 이름의 의미가 클라이언트와 서버가 통신을 하는데
  지금은 내가 클라이언트지만, 원래는 사용자가 따로 있을거니까 
  클라이언트랑 서버랑 통신을 하는데 잠깐 인터셉트해서 예를 들어 '야 잠깐만 헤더에 토큰 넣고 가'
  위 같은 작업하는 도중에 내 코드가 지시해서 interseptors라는 이름의 의미가 있는 거임.
  
  axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  1) 성공했을 때 // if (accessToken) {config.headers = config.headers || {}; config.headers.Authorization = `Bearer ${accessToken}`;}return config;}, 
  2) 실패했을 때 // (error) => Promise.reject(error));
  이런 느낌의 문법임. ,를 기준으로 앞은 성공 뒤는 실패. use()가 use(successFuction , errorFrunction) 이런 구조
  */
axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const accessToken = getItem();
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 4. 응답 인터셉터를 추가합니다.
/* 여기서 use를 중심으로 보면 (response) => response, << 이게 이제 성공했을 때 실행하는 부분인건데 
  그냥 동기로 response 그대로를 반환하는 이유는 애초에 여기가 뭐 데이터를 꺼내 쓸 최종위치가 아니고 axios의 내부 처리 안이기 때문*/ 
axiosInstance.interceptors.response.use(
  (response) => response,

  
// 5. 에러 발생시 (주로 401) , 401에러가 나면서 아직 재시도되지 않은 요청인 경우 시작
  async(error)=>{
    const originalRequest:CustomInternalAxiosRequestConfig = error.config;
// 처음으로 accessToken이 만료or유효X 하기때문에 401에러가 났을 때 리프레쉬로 로그인 유지
    if(error.response && error.response.status===401 && !originalRequest._retry){
      // 지금 실패한 요청이 refresh 요청 >> 로그아웃 및 로그인 페이지 이동
      // refresh시도를 했는데 refresh로 갱신하려 했는데 실패했냐?
        if(originalRequest.url === '/v1/auth/refresh'){
            const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
            const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

            removeAccessToken();
            removeRefreshToken();
            window.location.href="/login";
            return Promise.reject(error);
        }
        originalRequest._retry = true;

        // 리프레쉬 요청 중인지 확인 >> X -> 새로 refresh 요청 / O -> 대기 후 originalRequest 보내기
        // 아니면 refresh를 시도하긴한거냐? 했으면 기다릴게~
        /* 안했네? 그럼 리프레쉬토큰 받아오고 데이터 받아와. 그리고 어세스 토큰도 새로 받아와서 다시 요청 시작해 */
        if(!refreshPromise){
            //리프레시 요청 실행 후, 프라미스를 전역 변수에 할당
            refreshPromise = (async()=>{
                const{getItem:getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN,);
                const refreshToken = getRefreshToken();

                const {data} = await axiosInstance.post("/v1/auth/refresh",{
                    refresh: refreshToken,
                });

                //새 토큰 반환
                const {setItem:setAccessToken} = useLocalStorage(
                    LOCAL_STORAGE_KEY.ACCESS_TOKEN,
                );
                const {setItem:setRefreshToken} = useLocalStorage(
                    LOCAL_STORAGE_KEY.REFRESH_TOKEN,
                );
                setAccessToken(data.data.accessToken);
                setRefreshToken(data.data.refreshToken);
                //새 accessToken을 반환해 다른 요청들이 이것을 사용할 수 있게 함함
                return data.data.accessToken;
            })() // 요청을 하다가 실패했네? 토큰 다 지워서 그냥 로그아웃 시켜버려
            .catch(()=>{
                const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
                const{removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
                removeAccessToken()
                removeRefreshToken()
            }).finally(()=>{ // 뭐가됐든 끝났으면 cleanup시켜
                refreshPromise =null;
            });
        } // 어세스토큰 받아왔으니까 요청 다시 시작해
        return refreshPromise.then((newAccessToken)=>{
            originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`;
            return axiosInstance.request(originalRequest);
        });
    }
    //401 에러가 아닌 경우 그대로 오류를 반환환
    return Promise.reject(error);
  }
)