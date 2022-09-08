import React, {useState, useEffect, useRef} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import TopTrending from "../components/TopTrending";

function HomePage() {
    let [artists, setArtists] = useState(null);
    let [albums, setAlbums] = useState(null);
    let [songs, setSongs] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                let artistResponse = await dataHandler.apiGet("/api/artists/trending");
                setArtists(artistResponse);
                let albumResponse = await dataHandler.apiGet("/api/albums/trending");
                setAlbums(albumResponse);
                let songResponse = await dataHandler.apiGet("/api/songs/trending");
                setSongs(songResponse);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    const swapArrayItems = function (array, selectedItemId) {
        const mainCardIndex = 0;
        const otherCardIndex = array.map(object => object.id).indexOf(selectedItemId);
        let arrayCopy = [...array];
        arrayCopy[mainCardIndex] = arrayCopy.splice(otherCardIndex, 1, arrayCopy[mainCardIndex])[0]
        return arrayCopy;
    }

    const changeCardOrder = function (arrayType, selectedItemId) {
        if (arrayType === "artists") {
            const rearrangedArray = swapArrayItems(artists, selectedItemId);
            setArtists(rearrangedArray);
        } else if (arrayType === "albums") {
            const rearrangedArray = swapArrayItems(albums, selectedItemId);
            setAlbums(rearrangedArray);
        } else if (arrayType === "songs") {
            const rearrangedArray = swapArrayItems(songs, selectedItemId);
            setSongs(rearrangedArray);
        }
    }

    return (
        <div className="trending-content-wrapper">
            <TopTrending trendingItems={artists} changeCardOrder={changeCardOrder} apiRouteOption="artists"/>
            <TopTrending trendingItems={albums} changeCardOrder={changeCardOrder} apiRouteOption="albums"/>
            <TopTrending trendingItems={songs} changeCardOrder={changeCardOrder} apiRouteOption="songs"/>
        </div>
    );
}

export default HomePage;