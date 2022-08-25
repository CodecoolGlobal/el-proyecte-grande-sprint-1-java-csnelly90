import {useState, useEffect} from "react";
import "../UserPage.css"
import {dataHandler} from "../data/DataHandler";
import UserLikesTab from "./UserLikesTab";
import UserLikesContent from "./UserLikesContent";

function UserLikes() {
    const [toggleState, setToggleState] = useState(1);
    // const [artists, setArtists] = useState(null);
    // const [albums, setAlbums] = useState(null);
    // const [songs, setSongs] = useState(null);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // useEffect(() => {
    //     async function getData() {
    //         let response = await dataHandler.apiGet("/api/artists");
    //         setArtists(response);
    //     }
    //     getData();
    // }, []);

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
            />
        </div>
    );
}

export default UserLikes;