import {Outlet} from "react-router-dom";
import Navbar from "../component/Navbar.tsx";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;