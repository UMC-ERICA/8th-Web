import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Homepage=() =>{

    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};
export default Homepage;