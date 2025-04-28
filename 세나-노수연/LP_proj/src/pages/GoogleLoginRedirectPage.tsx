import  { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

const GoogleLoginRedirectPage = () => {
  const { setItem: setAcessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAcessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = '/my';
    } 
},[setAcessToken, setRefreshToken]);

  return (
    <div>
      <h1>구글 로그인 리다이렉트 페이지</h1>
    </div>
  )
}

export default GoogleLoginRedirectPage