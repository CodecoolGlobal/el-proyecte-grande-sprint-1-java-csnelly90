import {useState, useEffect} from "react";
import {dataHandler} from "../data/DataHandler";

function HomePage() {
    let [artists, setArtists] = useState(null);
    let [albums, setAlbums] = useState(null);

    useEffect(() => {
        async function getData() {
            let response = await dataHandler.apiGet("/api/artists");
            setArtists(response);
        }
        getData();
    }, []);

    return (
        <div className="top-artists">
            {artists &&
                artists.map(({ name, id, image }) => (
                    <div className="artist" key={id}>
                        <img src={image} alt=""/>
                        <h3>{name}</h3>
                    </div>
                ))}
        </div>
    );
}

export default HomePage;