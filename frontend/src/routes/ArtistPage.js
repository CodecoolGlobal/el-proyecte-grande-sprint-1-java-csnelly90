import React, {useEffect, useState} from "react";
import {dataHandler} from "../data/DataHandler";


function ArtistPage() {

    let [artist, setArtist] = useState(null);


    useEffect(() => {
        async function getData() {
            let response = await dataHandler.apiGet("/api/artists");
            setArtist(response);
        }
        getData();
    }, []);

    return (
        <div>
            {artist &&
                artist.map(({ name, id, image }) => (
                    <div className="artist" key={id}>
                        <div className={"artist-basic-info"}>
                            <div className={"artist-pic"}>
                                <img src={image} alt=""/>
                            </div>
                            <div className={"artist-info"}>
                                <b><h3 className="artist-name">{name}</h3></b>
                                <div className={"artist-text"}>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default ArtistPage;