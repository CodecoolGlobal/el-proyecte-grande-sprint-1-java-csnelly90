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