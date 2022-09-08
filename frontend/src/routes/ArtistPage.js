import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";
import {useParams} from "react-router-dom";
import "../ArtistPage.css"
import ArtistAlbums from "../components/ArtistAlbums";


function ArtistPage() {

    let [artistInfo, setArtistInfo] = useState(null);
    let [albumsInfo, setAlbumsInfo] = useState(null);
    const {artistId} = {artistId: useParams()};

    useEffect(() => {
        async function getData() {
            let artistResponse = await dataHandler.apiGet("/api/artists/" + artistId.id);
            let albumResponse = await dataHandler.apiGet("/api/albums/" + artistId.id);
            setArtistInfo(artistResponse);
            setAlbumsInfo(albumResponse);
        }

        getData();
    }, []);

    return (
        <div className={"artist-container"}>
            {artistInfo == null ? (<div className={"artist-info-container"}><h1>LOADING ARTIST INFO...</h1></div>) : (
                <div className={"artist-info-container"}>
                    <div className={"artist-pic-container"}>
                        <img src={artistInfo.image} alt=""/>
                    </div>
                    <div className={"artist-info"}>
                        <b><h1 className={"artist-name"}>{artistInfo.name}</h1></b>
                        <h3>Genres:</h3>
                        <small>{artistInfo.genre}</small>
                        <p>{artistInfo.blurbs}</p>
                    </div>
                </div>
            )}

            <div id="album-tab-container">
                <div className="album-tab active-tab">Albums</div>
            </div>

            <ArtistAlbums albumItems={albumsInfo} apiRouteOption="albums" changeCardOrder={null}/>
        </div>
    );
}

export default ArtistPage;