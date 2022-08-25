import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";
import {useParams} from "react-router-dom";
import "../ArtistPage.css"


 function ArtistPage() {

    let [artistInfo, setArtistInfo] = useState(null);
     const {artistId} = {artistId: useParams()} ;
    console.log(artistId.id)

     useEffect( () => {
        async function getData() {
            let response = await dataHandler.apiGet("/api/artist/"+artistId.id);
            console.log(response);
            setArtistInfo(response);
        }
        console.log("123456789")
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
                            <p>{artistInfo.blurbs}</p>
                        </div>
                   </div>
               </div>
               )}

        </div>
    );
}

export default ArtistPage;