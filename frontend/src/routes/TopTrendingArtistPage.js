import React, {useState, useEffect} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import TopTrendingPage from "../components/TopTrendingPage";

function TopTrendingArtistPage() {
    let [artists, setArtists] = useState(null);
    let [offset, setOffset] = useState(0);
    useEffect(() => {
        async function getData() {
            try {
                setArtists(null);
                let artistResponse = await dataHandler.apiGet(`/api/artists/top-trending?offset=${offset}`);
                setArtists(artistResponse);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [offset]);

    function decreaseOffset() {
        if (offset !== 0 && artists !== null) {
            setOffset(offset - 10);
        }
    }

    function increaseOffset() {
        if (artists !== null) {
            setOffset(offset + 10);
        }
    }

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
        }
    }

    return (
        <div className="trending-content-wrapper">
            <div className="card-redirect" id="buttons">
                <p onClick={decreaseOffset}>Previous page</p>
                <p onClick={() => {increaseOffset()}}>Next Page</p>
            </div>
            <TopTrendingPage trendingItems={artists} changeCardOrder={changeCardOrder} apiRouteOption="artists" cardType="artists"/>
        </div>
    );
}

export default TopTrendingArtistPage;