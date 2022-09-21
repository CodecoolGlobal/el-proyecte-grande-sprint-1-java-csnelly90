import React, {useState, useEffect} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import TopTrending from "../components/TopTrending";

function TopTrendingSongPage() {
    let [songs, setSongs] = useState(null);
    let [offset, setOffset] = useState(0);
    useEffect(() => {
        async function getData() {
            try {
                setSongs(null);
                let songResponse = await dataHandler.apiGet(`/api/songs/top-trending?offset=${offset}`);
                setSongs(songResponse);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [offset]);

    function decreaseOffset() {
        if (offset !== 0 && songs !== null) {
            setOffset(offset - 10);
        }
    }

    function increaseOffset() {
        if (songs !== null) {
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
        if (arrayType === "songs") {
            const rearrangedArray = swapArrayItems(songs, selectedItemId);
            setSongs(rearrangedArray);
        }
    }

    return (
        <div className="trending-content-wrapper">
            <div className="card-redirect">
                <p onClick={decreaseOffset}>Previous page</p>
                <p onClick={increaseOffset}>Next Page</p>
            </div>
            <TopTrending trendingItems={songs} changeCardOrder={changeCardOrder} apiRouteOption="songs" cardType="songs"/>
        </div>
    );
}

export default TopTrendingSongPage;