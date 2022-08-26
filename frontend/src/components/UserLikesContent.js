import React, {useEffect, useState} from "react";
import "../UserPage.css"
import {dataHandler} from "../data/DataHandler";

function LikedContent(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await dataHandler.apiGet(`/api/artist/${props.artistId}/`);
            setData(response);
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
                    {/*<div><h1>{data.name}</h1></div>*/}
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
    const likedContent = props.likedArtists.map((artistId) =>
        <div key={artistId} className={props.toggleState === 1 ? "likes-content active-content" : "likes-content"}>
            <LikedContent artistId={artistId} />
        </div>
    );

    return (
        <div id="user-likes-content-container">

            {likedContent}

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