import {Link, useNavigate} from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import '../navbar.css';
import {useAuth} from "../security/auth";

function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/login");
    }

    return (
        <nav>
            <ul>
                <Link to="/">
                    <div id="home-and-search-holder">
                        <li>Home</li>
                    </div>
                </Link>
            </ul>

            <div id="search-holder">
                <SearchBar/>
            </div>

            {auth.user ? (
                <ul>
                    <Link to="user">
                        <div id="user-link-holder">
                            <li>Profile</li>
                        </div>
                    </Link>
                    <Link to="login">
                        <div id="user-link-holder" onClick={handleLogout}>
                            <li>Logout</li>
                        </div>
                    </Link>
                </ul>
            ) : (
                <ul>
                    <Link to="login">
                        <div id="user-link-holder">
                            <li>Login</li>
                        </div>
                    </Link>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;