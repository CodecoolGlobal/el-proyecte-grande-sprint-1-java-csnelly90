import {Link} from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";

function Navbar() {
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            <SearchBar />
            <li><Link to="user">User page</Link></li>
        </nav>
    );
}

export default Navbar;