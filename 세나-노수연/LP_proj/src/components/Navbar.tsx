import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const {accessToken} = useAuth();

    return (
        <nav className = 'bg-white dark:bg-gray-900 shadow-md fixed w-full z-10'>
            <div className='flex items-center justify-between p-4'>
                <Link
                    to = '/'
                    className='text-xl font-bold text-gray-900 dark:text-white'>
                    Spinning Dolimpan
                </Link>
                <div className='space-x-6'>
                    {!accessToken && (
                        <>
                        <Link
                        to={'/login'}
                        className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-colors">
                        로그인
                        </Link>
                        <Link
                        to={'/signup'}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-400 transition-colors">
                        회원가입
                        </Link>
                        </>
                    )}
                    {accessToken && (
                        <>
                        <Link
                        to={'/my'}
                        className='text-gray-700 dark:text-gray-300 hover:text-blue-500'>
                        마이페이지
                        </Link>
                        <Link
                        to={'/search'}
                        className='text-gray-700 dark:text-gray-300 hover:text-blue-500'>
                        검색
                        </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )

}

export default Navbar;