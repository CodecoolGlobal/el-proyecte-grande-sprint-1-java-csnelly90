import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";
import {useParams} from "react-router-dom";
import "../ArtistPage.css"


 function ArtistPage() {

    let [artistInfo, setArtistInfo] = useState(null);
     const {artistId} = {artistId: useParams()} ;

     useEffect( () => {
        async function getData() {
            let response = await dataHandler.apiGet("/api/artists/"+artistId.id);
            setArtistInfo(response);
        }
         getData();
    }, []);

    return (
        <div>
            {artistInfo == null ? (<h1>LOADING...</h1>):
               (<div className={"artist-container"}>
                   <div className={"artist-info-container"}>
                       <div className={"artist-pic"}>
                           <img src={artistInfo.image} alt=""/>
                       </div>
                        <div className={"artist-info"}>
                            <b><h1 className={"artist-name"}>{artistInfo.name}</h1></b>
                            <h3>Genres:</h3>
                            <small>{artistInfo.genre}</small>
                            <p>{artistInfo.blurbs}</p>
                        </div>
                   </div>
               </div>
               )}

        </div>
    );
}

export default ArtistPage;