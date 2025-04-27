import {createContext, PropsWithChildren, useState, useContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {postSignin, postLogout} from "../apis/auth.ts";
import {RequestSigninDto} from "../types/auth.ts";
import {LOCAL_STORAGE_KEY} from "../constants/key.ts";

interface AuthContextType {
    accessToken: string|null;
    refreshToken: string|null;
    login: (sigininData: RequestSigninDto, onSuccess?: () => void) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const {
      getItem: getRefreshTokenFromStorage,
      setItem: setRefreshTokenInStorage,
      removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());


  const login = async (signinData: RequestSigninDto, onSuccess?: () => void) => {
    try {
      const response = await postSignin(signinData);
      if (response && response.data) {
        const { accessToken, refreshToken } = response.data;
  
        setAccessTokenInStorage(accessToken);
        setRefreshTokenInStorage(refreshToken);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
  
        if (onSuccess) {
          onSuccess();  // ✅ 여기서 navigate("/my") 실행
        }
      }
    } catch (error) {
      console.error("로그인오류", error);
      alert("로그인 실패");
    }
  };

const logout = async () => {
    try {
        await postLogout();
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        // 상태 초기화
        setAccessToken(null);
        setRefreshToken(null);

        alert("로그아웃 성공");
        window.location.href = "/";
    } catch (error) {
        console.error("로그아웃 오류", error);
        alert("로그아웃 실패")
    }
  };

  return (
      <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
          {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};