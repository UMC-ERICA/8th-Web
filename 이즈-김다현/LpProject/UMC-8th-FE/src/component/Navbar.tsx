import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Sidebar } from "lucide-react";

const Navbar = () => {
    const { accessToken, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    
    return (
    <nav className="bg-blue-200 dark:bg-gray-900 shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between p-4">

            <Sidebar />
            <Link to = "/" className="text-xl font-bold text-gray-900 dark:text-white">빙글빙글정신머리</Link>
            <div className="flex items-center gap-4">
                {!accessToken && (
                    <>
                    <Link to = {"/login"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">로그인</Link>
                    <Link to = {"/signup"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">회원가입</Link>
                    </>
                )}
                <Link to = {"/search"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    <Search size={20} />
                </Link>
                {accessToken && (
                <Link to = {"/my"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500"> 이즈 님 환영합니다!</Link>)}
                <button onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    로그아웃
                </button>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;

// 여기서 useeffect 써서 받아오고