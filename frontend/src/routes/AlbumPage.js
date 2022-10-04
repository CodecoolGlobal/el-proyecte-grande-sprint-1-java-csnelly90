import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";
import {useParams} from "react-router-dom";
import AlbumSongs from "../components/AlbumSongs";
import "../ArtistPage.css"



function AlbumPage(){
    let [albumsInfo, setAlbumsInfo] = useState(null);
    const {albumId} = {albumId: useParams()};

    useEffect(() => {
        async function getData() {
            let albumResponse = await dataHandler.apiGet("/api/songs/" + albumId.id);

            setAlbumsInfo(albumResponse);
            await console.log(albumResponse)
        }

        getData();
    }, [albumId]);

    return (
        <div className={"album-container"}>
            {albumsInfo == null ? (<div className={"album-info-container"}><h1>LOADING TRACKS INFO...</h1></div>) : (
                <div className={"album-info-container"}>
                    <div className={"album-pic-container"}>
                        <img src={albumsInfo[0].image} alt=""/>
                    </div>
                    <div className={"album-info"}>
                        <b><h1 className={"artist-name"}>{albumsInfo[0].albumName}</h1></b>
                        <h3>Genres:</h3>
                    </div>
                </div>

            )}

            <div id="song-tab-container">
                <div className="song-tab active-tab">Tracks</div>
            </div>

            <AlbumSongs albumItems={albumsInfo} apiRouteOption="albums" changeCardOrder={null}/>
        </div>
    )
}
export default AlbumPage;