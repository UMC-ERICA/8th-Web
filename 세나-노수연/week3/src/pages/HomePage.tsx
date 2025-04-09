import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar";

const HomePage =() => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default HomePage;