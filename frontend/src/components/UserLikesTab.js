import React from "react";
import "../UserPage.css"

function UserLikesTab(props) {
    return (
        <div id="user-likes-tab-container">
            <div
                className={props.toggleState === 1 ? "likes-tab active-tab" : "likes-tab"}
                onClick={() => props.toggleTab(1)}
            >
                Favourite artists
            </div>
            <div
                className={props.toggleState === 2 ? "likes-tab active-tab" : "likes-tab"}
                onClick={() => props.toggleTab(2)}
            >
                Favourite albums
            </div>
            <div
                className={props.toggleState === 3 ? "likes-tab active-tab" : "likes-tab"}
                onClick={() => props.toggleTab(3)}
            >
                Favourite songs
            </div>
        </div>
    );
}

export default UserLikesTab;