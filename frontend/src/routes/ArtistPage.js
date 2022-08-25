import React, {useState} from "react";

let imageAlt = <img alt={"Artist picture"} />
let name = <b><h2> Name Name</h2></b>;
let basic_info = <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

function ArtistPage() {

    return (
        <div>
            <div className={"artist-basic-info-container"}>
                <div className={"artist-pic"}>
                    {imageAlt}
                </div>
                <div className={"artist-basic-info"}>
                    {name}
                    {basic_info}
                </div>
            </div>
            <div className={"albums-list"}>

            </div>
        </div>
    );
}

export default ArtistPage;