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
            let artistResponse = await dataHandler.apiGet("/api/artists/trending");
            setArtists(artistResponse);
        }

        getData();
    }, []);

    const changeCardOrder = function (arrayType, id) {
        if (arrayType === "artists") {
            const mainCardIndex = 0;
            const otherCardIndex = artists.map(object => object.id).indexOf(id);
            let artistsCopy = [...artists];
            artistsCopy[mainCardIndex] = artistsCopy.splice(otherCardIndex, 1, artistsCopy[mainCardIndex])[0]
            setArtists(artistsCopy);
        } else if (arrayType === "albums") {
            const mainCardIndex = 0;
            const otherCardIndex = albums.map(object => object.id).indexOf(id);
            let albumsCopy = [...artists];
            albumsCopy[mainCardIndex] = albumsCopy.splice(otherCardIndex, 1, albumsCopy[mainCardIndex])[0]
            setArtists(albumsCopy);
        } else if (arrayType === "songs") {
            const mainCardIndex = 0;
            const otherCardIndex = songs.map(object => object.id).indexOf(id);
            let songsCopy = [...artists];
            songsCopy[mainCardIndex] = songsCopy.splice(otherCardIndex, 1, songsCopy[mainCardIndex])[0]
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