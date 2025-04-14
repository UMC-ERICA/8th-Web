import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <nav>네비게이션 바입니다.</nav>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    );
};

export default HomeLayout;