import React, {useEffect, useState} from "react";
import "../UserPage.css"
import {dataHandler} from "../data/DataHandler";

function LikedContent(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (props.itemId.includes("art")) {
                const response = await dataHandler.apiGet(`/api/artists/${props.itemId}/`);
                setData(response);
            } else if (props.itemId.includes("alb")) {
                const response = await dataHandler.apiGet(`/api/albums/album/${props.itemId}/`);
                setData(response);
            } else {
                const response = await dataHandler.apiGet(`/api/songs/song/${props.itemId}/`);
                setData(response);
            }
        };
        fetchData();
    }, [props.id]);

    if (data) {
        return (
            <div className="flex-row flex-space-between">
                <div className="flex-col">
                    <div id="user-likes-title">
                        <h2>{data.name}</h2>
                    </div>
                    <div className="justified-text">
                        <p>{data.blurbs}</p>
                    </div>
                </div>
                <div>
                    <img src={data.image} alt=""/>
                </div>
            </div>
    );
    } else {
        return null;
    }
}

function UserLikesContent(props) {
    let likedArtist = [];
    let likedAlbum = [];
    let likedSong = [];
    if (props.likedItems !== null) {
        props.likedItems.map((itemId) => {
            if (itemId.includes("art")) {
                likedArtist.push(<div key={itemId} className={props.toggleState === 1 ? "likes-content active-content" : "likes-content"}>
                    <LikedContent itemId={itemId}/>
                </div>);
            } else if (itemId.includes("alb")) {
                likedAlbum.push(<div key={itemId} className={props.toggleState === 2 ? "likes-content active-content" : "likes-content"}>
                    <LikedContent itemId={itemId}/>
                </div>);
            } else if (itemId.includes("tra")) {
                likedSong.push(<div key={itemId} className={props.toggleState === 3 ? "likes-content active-content" : "likes-content"}>
                    <LikedContent itemId={itemId} />
                </div>);
            }
        })
        if (likedArtist.length === 0) {
            likedArtist.push(<div key={likedArtist.length}>
                <p>There is no liked artist</p>
            </div>);
        }
        if (likedAlbum.length === 0) {
            likedAlbum.push(<div key={likedAlbum.length}>
                <p>There is no liked album</p>
            </div>);
        }
        if (likedSong.length === 0) {
            likedSong.push(<div key={likedSong.length}>
                <p>There is no liked song</p>
            </div>);
        }
    }

    return (
        <div id="user-likes-content-container">
            {likedArtist}

            {likedAlbum}

            {likedSong}
        </div>
    );
}

export default UserLikesContent;