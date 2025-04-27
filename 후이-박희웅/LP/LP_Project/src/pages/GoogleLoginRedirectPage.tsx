import  { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

const GoogleLoginRedirectPage = () => {
  const { setItem: setAcessToken } = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    if (accessToken) {
      setAcessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = '/my';
    } 
},[setAcessToken, setRefreshToken]);

  return (
    <div>
      <h1>구글 로그인 리다이렉트 페이지</h1>
      <p>구글 로그인 후 리다이렉트되는 페이지입니다.</p>
    </div>
  )
}

export default GoogleLoginRedirectPage
