import React, {useState, useEffect} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import {useNavigate} from "react-router-dom";

function HomePage() {
    let [artists, setArtists] = useState(null);
    let [albums, setAlbums] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            let response = await dataHandler.apiGet("/api/artists");
            setArtists(response);
        }
        getData();
    }, []);


    return (
        <div className="top-artists">
            {artists == null ? (<h1>LOADING...</h1>):
                artists.map(({ name, id, image }) => (
                    <div className="artist" key={id}>
                        <img src={image} alt="" onClick={() => navigate("/artists/"+id)}/>
                        <h3 className="artist-name">{name}</h3>
                    </div>
                ))}
        </div>
    );
}

export default HomePage;