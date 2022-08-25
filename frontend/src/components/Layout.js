import "../App.css";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <Outlet />
                <Header />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;