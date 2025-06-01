import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { Menu, X } from "lucide-react";
import { getMyInfo } from "../apis/auth";


const Navbar = ()=>{
    const {accessToken} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(()=>{
            const getData = async() => {
                const response = await getMyInfo();
                // console.log(response);
                setData(response)
            };
            getData();
        },[]);

    const toggleSidebar = ()=>{
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
        <nav className="bg-gray-50 dark:bg-gray-900 shadow-md  w-full z-10 fixed">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between p-1">

                <div className="flex justify-start gap-2">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
                        >
                            {isSidebarOpen ? <X size={24} /> :<Menu size={24} />}
                        </button>
                
                <Link to='/' className= 'text-xl font-bold text-gray-900 dark:text-white'>어디까지돌아가는거예요</Link>
                </div>

                <div className="flex flex-row-reverse space-x-4 space-x-reverse mr-5">
                    {!accessToken &&(
                        <>
                        <Link to={"/login"}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            로그인
                        </Link>
                        <Link to={"/signup"}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            회원가입
                        </Link>
                        </>
                    )}
                    {accessToken &&(
                    <div className="mr-10">
                    <span className="text-pink-400 mr-4">{data?.data.name}님 환영합니다.</span>
                    <Link to= {"/mypage"}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 mr-5">
                        마이페이지
                    </Link>
                    <Link to= {"/search"}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    검색
                    </Link>
                    </div>
                    
                )}
                
                </div>
                </div>
            </div>
        </nav>
        <div className={`fixed top-0 left-0 h-full w-64 bg-pink-100 dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out z-20 ${isSidebarOpen ? 'translate-0' : '-translate-x-full'}`}>
            <div className="p-4 mt-16">
                <h2 className="text-xl font-bold mb-4">메뉴</h2>
                <div className="space-y-4">
                    <Link to={"/"} className="block text-gray-700 dark:text-gray-300 hover:text-pink-500">
                    홈
                    </Link>
                    {accessToken &&(
                        <>
                        <Link to={"/mypage"} className="block text-gray-700 dark:text-gray-300 hover:text-pink-500">
                        마이페이지
                        </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
        {isSidebarOpen &&(
            <div
                className="fixed inset-0 "
                onClick={toggleSidebar}
            />
        )}


        </>
        
    );

};
export default Navbar;