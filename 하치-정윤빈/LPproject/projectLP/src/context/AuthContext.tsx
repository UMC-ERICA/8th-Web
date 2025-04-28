import { postSignin, postLogout} from "../apis/auth.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import {RequestSigninDto} from "../types/auth.ts";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AuthContextType{
    accessToken: string|null;
    refreshToken: string|null;
    login:(signinData:RequestSigninDto) => Promise<void>;
    logout:()=> Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async()=>{},
    logout: async()=>{},
});

export const AuthProvider = ({children}:PropsWithChildren)=>{
    
    const {
        getItem:getAccessTokenFromStorage,
        setItem:setAccessTokenInStorage,
        removeItem:removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem:getRefreshTokenFromStorage,
        setItem:setRefreshTokenInStorage,
        removeItem:removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccesstoken] = useState<string|null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshtoken] = useState<string|null>(
        getRefreshTokenFromStorage(),
    );

    const login = async(signinData:RequestSigninDto) =>{
        try{
          const {data} = await postSignin(signinData);

          if (data){
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStorage(newRefreshToken);

            setAccesstoken(newAccessToken);
            setRefreshtoken(newRefreshToken);
            alert("로그인 성공");
            window.location.href="/mypage";
          }
        }catch(error){
            console.error("로그인 오류",error);
            alert("로그인 실패");
        }
    }

    const logout = async() =>{
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            //또는 localStorage.clear();

            setAccesstoken(null);
            setRefreshtoken(null);

            alert("로그아웃 성공")
        }catch (error){
            console.error("로그아웃 오류", error);
            alert('로그아웃 실패');
        }
    };
    return (
        <AuthContext.Provider value = {{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    ); 
};

export const useAuth = ()=>{
    const context: AuthContextType = useContext(AuthContext);
    if (!context){
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context
}

