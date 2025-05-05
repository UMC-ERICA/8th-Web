import {useEffect, useState} from "react";
import {getMyInfo} from "../apis/auth.ts";
import {ResponseMyInfoDto} from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
// Removed incorrect import of 'data' from 'react-router-dom'

const MyPage = () => {
    const navigate = useNavigate(); // Removed incorrect import of 'useNavigate' from 'react-router-dom'
    const {logout} = useAuth(); // Removed incorrect import of 'useAuth' from 'react-router-dom'
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response: ResponseMyInfoDto = await getMyInfo();
            console.log(response);
            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return <div>
        {data && data.data && <h1>{data.data.name}님 환영합니다.</h1>}
        {data && data.data?.avatar && (
            <img src={data.data.avatar as string} alt={"구글 로고"} />
        )}
        {data && data.data?.email && <h1>{data.data.email}</h1>}
        <button className = "cursor-pointer" onClick={handleLogout}>로그아웃</button>
        </div>;
};

export default MyPage;
