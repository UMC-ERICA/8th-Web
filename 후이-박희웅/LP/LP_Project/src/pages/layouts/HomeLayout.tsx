import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa';

const ProtectedLayout = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const currentOrder = searchParams.get('order') || 'latest';

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        setIsLoggedIn(!!token)

        const storedUsername = localStorage.getItem('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
    }, [])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      };

      const handleResize = () => {
        if (window.innerWidth < 768) {
          setSidebarOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
        <div className="h-dvh flex flex-col bg-black text-white">
            <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-white text-xl mr-2"
                    >
                        ☰
                    </button>
                    <Link to='/home' className="text-pink-500 text-2xl font-bold">
                        돌려돌려LP판
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                  {isLoggedIn ? (
                    <>
                      <Link to="/search" className="text-white hover:text-pink-400 text-xl">
                        <FaSearch />
                      </Link>
                      <span className="text-sm">{username}님 안녕하세요</span>
                      <button
                        onClick={() => {
                          localStorage.removeItem('accessToken')
                          localStorage.removeItem('refreshToken')
                          localStorage.removeItem('username')
                          setIsLoggedIn(false);
                          setUsername('');
                          navigate('/login', { replace: true })
                        }}
                        className="px-2 py-1 border border-white rounded-md text-sm hover:bg-white hover:text-black transition-colors"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/search" className="text-white hover:text-pink-400 text-xl">
                        <FaSearch />
                      </Link>
                      <Link to="/login" className="text-base px-2 py-1 hover:text-pink-400">로그인</Link>
                      <Link to="/signup" className="text-base px-2 py-1 hover:text-pink-400">회원가입</Link>
                    </>
                  )}
                </div>
            </nav>

            <div className="flex flex-1">
              <aside
                ref={sidebarRef}
                className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] w-48 bg-gray-900 p-4 z-40 transform transition-transform duration-300 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link to="/search" className="flex items-center gap-2 hover:text-pink-400">
                      <FaSearch /> 찾기
                    </Link>
                  </li>
                  <li>
                    <Link to="/mypage" className="flex items-center gap-2 hover:text-pink-400">
                      <FaUser /> 마이페이지
                    </Link>
                  </li>
                </ul>
              </aside>
              <main className="flex-1 p-4 relative bg-black">
                <Outlet context={{ order: currentOrder }} />
              </main>
            </div>
        </div>
    )
}

export default ProtectedLayout;