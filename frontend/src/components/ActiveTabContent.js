import React from "react";
import ArtistAlbums from "./ArtistAlbums";
import AlbumSongs from "./AlbumSongs";
import Comments from "./Comments";

function ActiveTabContent(props){
    return (
        <div id="user-likes-content-container">


            <div
                className={props.activeState === 1 ? "likes-content active-content" : "likes-content"}
            >
                <h2>{props.contentType.toUpperCase()}</h2>
                {props.contentType==="albums" ? <ArtistAlbums albumItems={props.items} apiRouteOption="albums"/> :
                    <AlbumSongs albumItems={props.items} apiRouteOption="songs" /> }
            </div>

            <div
                className={props.activeState === 2 ? "likes-content active-content" : "likes-content"}
            >
                <h2>Comments</h2>
                <Comments id={props.id}/>
            </div>
        </div>
    );

}

export default ActiveTabContent