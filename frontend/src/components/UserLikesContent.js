import React from "react";
import "../UserPage.css"

function UserLikesContent(props) {
    return (
        <div id="user-likes-content-container">
            {/*<div id="user-likes-title">*/}
            {/*    <h2>Liked artists</h2>*/}
            {/*</div>*/}
            <div
                className={props.toggleState === 1 ? "likes-content active-content" : "likes-content"}
            >
                <p>
                    Lorem ipsum
                </p>
            </div>

            <div
                className={props.toggleState === 2 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Liked albums</h2>
                <p>
                    Under construction...
                </p>
            </div>

            <div
                className={props.toggleState === 3 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Liked songs</h2>
                <p>
                    Under construction...
                </p>
            </div>
        </div>
    );
}

export default UserLikesContent;