import {Link, Outlet} from 'react-router-dom'

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col bg-black text-white">
        <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md">
            <div className="text-pink-500 text-2xl font-bold">
                돌려돌려LP판
            </div>

        <div className="flex gap-3">
            <Link
                to='/login'
                className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-colors">
                로그인
            </Link>
            <Link
                to='/signup'
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-400 transition-colors">
                회원가입
            </Link>
                </div>
        </nav>

        <main className="flex-1">
            <Outlet />
        </main>

        <footer className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
            this is the Footer
        </footer>
    </div>

    )
}


export default HomeLayout;