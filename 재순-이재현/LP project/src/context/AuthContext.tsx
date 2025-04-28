import {RequestSigninDto} from "../types/auth.ts";
import {createContext, PropsWithChildren, useContext, useState} from "react";
import {useLocalStorage } from "../hooks/useLocalStorage.ts";

import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { postLogout, postSignin } from "../apis/auth.ts";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(
    getRefreshTokenFromStorage(), 
  );
  
  const login = async (signInData: RequestSigninDto) => {
    try {
        const { data } = await postSignin(signInData);
    // Use the data object, for example:
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setAccessTokenInStorage(data.accessToken);
    setRefreshTokenInStorage(data.refreshToken);

    if (data) {
        const newAccessToken = data.accessToken;
        const newRecrefreshToken = data.refreshToken;

        setAccessToken(newAccessToken);        
        setRefreshToken(newRecrefreshToken);
        alert("로그인 성공")
        window.location.href = "/my";
        
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRecrefreshToken);
  };
    } catch (error) {}
    alert("로그인 실패")
  
  };
  const logout = async () => {
    try {
        await postLogout();
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();

        setAccessToken(null);
        setRefreshToken(null);
        alert("로그아웃 성공")
    }catch(error) {
        console.error("로그아웃 실패", error);
    alert("로그아웃 실패")
    }
    };
    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                login,
                logout,
                }}>
                {children}
            </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context: AuthContextType = useContext(AuthContext);
if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}