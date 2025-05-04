import {useAuth} from "../../context/AuthContext";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedLayout = () => {

  const { accessToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="h-dvh flex flex-col bg-black text-white">
        <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md">
            <div className="text-pink-500 text-2xl font-bold">
              <Link to='/home' className="text-pink-500 text-2xl font-bold">
                돌려돌려LP판
              </Link>
            </div>
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <span className="text-sm">{username}님 안녕하세요</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('username')
                    navigate('/login', { replace: true })
                  }}
                  className="px-2 py-1 border border-white rounded-md text-sm hover:bg-white hover:text-black transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
        </nav>
        <main className="flex-1">
            <Outlet />
        </main>

        <footer className="container mx-auto text-center py-4 border-t border-gray-700 text-sm text-gray-400">
                <p> &copy; {new Date().getFullYear()} 돌려돌려LP판. All rights reserved.
                </p>
                <Link to={'#'}>Privacy Policy</Link>
                <Link to={'#'}>Terms of Service</Link>
                <Link to={'#'}>Contact</Link>
            </footer>
    </div>
  )
};

export default ProtectedLayout
