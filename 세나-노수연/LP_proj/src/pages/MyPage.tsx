import {useEffect, useState} from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>((null));

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate('/');
    };


    return (
        <div>
            <h1>MyPage</h1>
            <h2>{data?.data?.name} 환영합니다.</h2>
            <h2>{data?.data?.email}</h2>
            <button onClick = {handleLogout} className='bg-black text-white p-2 rounded-md cursor-pointer hover:scale-90'>
                로그아웃
            </button>
        </div>
    )
};

export default MyPage;