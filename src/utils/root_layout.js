import { Outlet } from "react-router-dom";
import Navbar from "../components/_Common/Navbar";

const RootLayout = () => {
    return ( 
        <div>
           <Navbar />
           <Outlet />
        </div>
     );
}
 
export default RootLayout;