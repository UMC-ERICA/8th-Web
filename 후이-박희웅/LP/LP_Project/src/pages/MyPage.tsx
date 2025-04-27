import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { ResponseMyInfoDto } from "../types/auth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const {logout} = useAuth();
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 [진입] localStorage accessToken:", localStorage.getItem("accessToken"));
    console.log("🚀 [진입] localStorage refreshToken:", localStorage.getItem("refreshToken"));
  
    const fetchUserInfo = async () => {
      try {
        console.log("🔵 [요청 직전] accessToken:", localStorage.getItem("accessToken"));
  
        const response = await getMyInfo();
        console.log("✅ [응답 성공] 사용자 정보:", response);
        setUserInfo(response);
      } catch (error) {
        console.log("❌ [요청 실패] 사용자 정보 에러:", error);
  
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.log("🛑 [401 에러 발생] accessToken 만료 또는 인증 실패");
            alert('로그인이 필요합니다.');
            navigate('/login');
          } else {
            console.log("🛑 [다른 에러] 상태코드:", error.response?.status);
          }
        }
      }
    };
  
    fetchUserInfo();
  }, [navigate]);
  
  if (!userInfo) return <div>로딩중...</div>;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <h1>내 정보</h1>
      <p>이메일: {userInfo.data.email}</p>
      <p>이름: {userInfo.data.name}</p>
      <button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:scale-105 transition-transform">
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
