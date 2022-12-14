import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";
import {useParams} from "react-router-dom";
import "../ArtistPage.css"
import TabsManager from "../components/TabsManager";
import Like from "../components/Like";



function AlbumPage(){
    let [albumsInfo, setAlbumsInfo] = useState(null);
    const {id} =  useParams();

    useEffect(() => {
        async function getData() {
            let albumResponse = await dataHandler.apiGet("/api/songs/" + id);
            setAlbumsInfo(albumResponse);
        }
        getData();
    }, [id]);

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
                    <Like itemid={albumsInfo[0].id}/>
                </div>
            )}

            <TabsManager contentType={"songs"} id={id} apiRouteOption={"albums"} changeCardOrder={null}/>
        </div>
    )
}
export default AlbumPage;