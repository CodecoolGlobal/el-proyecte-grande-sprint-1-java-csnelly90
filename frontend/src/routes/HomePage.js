import React, {useState, useEffect} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import TopTrending from "../components/TopTrending";

function HomePage() {
    let [artists, setArtists] = useState(null);
    let [albums, setAlbums] = useState(null);
    let [songs, setSongs] = useState(null);

    useEffect(() => {
        async function getData() {
            let artistResponse = await dataHandler.apiGet("/api/artists");
            setArtists(artistResponse);
        }

        getData();
    }, []);

    const changeCardOrder = function (arrayType, id) {
        if (arrayType === "artists") {
            const index = artists.map(object => object.id).indexOf(id);
            const artistsCopy = artists.slice();
            artistsCopy.unshift(artistsCopy.splice(index, 1)[0]);
            setArtists(artistsCopy);
        } else if (arrayType === "albums") {
            const index = albums.map(object => object.id).indexOf(id);
            const albumsCopy = albums.slice();
            albumsCopy.unshift(albumsCopy.splice(index, 1)[0]);
            setArtists(albumsCopy);
        } else if (arrayType === "songs") {
            const index = songs.map(object => object.id).indexOf(id);
            const songsCopy = songs.slice();
            songsCopy.unshift(songsCopy.splice(index, 1)[0]);
            setArtists(songsCopy);
        }
    }

    // TODO: also check albums and songs for null value when they are implemented
    if (artists == null) {
        return (
            <div className="trending-content-wrapper">
                <div className="loading">
                    <h1>LOADING...</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="trending-content-wrapper">
                <TopTrending trendingItems={artists} changeCardOrder={changeCardOrder} apiRouteOption="artists"/>
            </div>
        );
    }

}

export default HomePage;