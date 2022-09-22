import {Link} from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import '../navbar.css';

function Navbar() {
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
            <ul>
                <Link to="user">
                    <div id="user-link-holder">
                        <li>User page</li>
                    </div>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;