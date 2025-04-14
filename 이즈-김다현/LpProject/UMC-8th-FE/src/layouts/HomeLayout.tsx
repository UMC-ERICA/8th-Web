import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <nav> 네비바 입니다</nav>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer>하단바</footer>
        </div>
    )
}

export default HomeLayout;