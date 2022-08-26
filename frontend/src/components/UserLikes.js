import {useState} from "react";
import "../UserPage.css"
import UserLikesTab from "./UserLikesTab";
import UserLikesContent from "./UserLikesContent";

function UserLikes() {
    const likedArtists = ['art.146985808', 'art.12313694', 'art.15237004'];
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div id="user-likes-container">
            <UserLikesTab
                toggleState={toggleState}
                setToggleState={setToggleState}
                toggleTab={toggleTab}
            />
            <UserLikesContent
                toggleState={toggleState}
                setToggleState={setToggleState}
                toggleTab={toggleTab}
                likedArtists={likedArtists}
            />
        </div>
    );
}

export default UserLikes;