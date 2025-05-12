import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();

    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            if(response.data) setData(response);
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    console.log("avatar:", data?.data?.avatar)
    

    return (
        <div>
            <h1 className="text-cyan-200 mt-20">{data?.data.name}님 환영합니다.</h1>
            <h1 className="text-cyan-200">님 환영합니다.</h1>
            <img src={data?.data?.avatar ?? "/default-avatar.png"} alt="구글 로고" />
            <h1 className="text-cyan-500">{data?.data?.email}</h1>
            <button 
            className="cursor-pointer bg-blue-200 rounded-sm p-5 hover:scale-90"
            onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;