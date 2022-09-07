import {Link} from "react-router-dom";
import React from "react";
import "../notFound.css"

function PageNotFound() {
    return (
        <div className="not-found-container">
            <h2>Oops!</h2>
            <h1>404</h1>
            <p>We can't find the page you are looking for.</p>
            <p><Link to="/">Back to home</Link></p>
        </div>
    );
}

export default PageNotFound;