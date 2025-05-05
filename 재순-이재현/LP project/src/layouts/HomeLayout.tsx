import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <nav>네비게이션 바입니다.</nav>
            <Navbar/>
            <main className="flex-1 mt-10">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default HomeLayout;