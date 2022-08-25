import React from "react";
import "../UserPage.css"

function UserLikesContent(props) {
    return (
        <div id="user-likes-content-container">
            <div
                className={props.toggleState === 1 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Content 1</h2>
                <p>
                    Lorem ipsum
                </p>
            </div>

            <div
                className={props.toggleState === 2 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Content 2</h2>
                <p>
                    dolor sit amet
                </p>
            </div>

            <div
                className={props.toggleState === 3 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Content 3</h2>
                <p>
                    consectetur adipisicing elit
                </p>
            </div>
        </div>
    );
}

export default UserLikesContent;