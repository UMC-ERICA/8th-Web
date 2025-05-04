import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null); // data를 null로 초기화
  const navigate = useNavigate(); // 페이지 이동용
  const { removeItem: removeAccessToken } = useLocalStorage("ACCESS_TOKEN");
  const { removeItem: removeRefreshToken } = useLocalStorage("REFRESH_TOKEN");

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);  // 데이터 업데이트
    };
    getData();
  }, []);

  const handleLogout = () => {
    console.log("로그아웃 클릭됨");
    localStorage.clear(); // 로컬 스토리지 초기화
    // 1. 토큰 삭제
    removeAccessToken();
    removeRefreshToken();
    // 2. 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div>
      <h1>내 정보</h1>
      {/* 데이터가 로드되었을 때 출력 */}
      <p>이메일: {data?.data.email}</p>
      <p>이름: {data?.data.name}</p>
      <button
        onClick={handleLogout}
        className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:scale-105 transition-transform"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;