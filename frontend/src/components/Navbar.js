import {Link} from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import '../navbar.css';

function Navbar() {
    return (
        <nav>
            <ul>
                <div id="home-and-search-holder">
                    <li><Link to="/">Home</Link></li>
                </div>
                <div id="search-holder">
                    <SearchBar />
                </div>
                <div id="user-link-holder">
                    <li><Link to="user">User page</Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;