import React, {useState, useEffect} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import TopTrending from "../components/TopTrending";

function TopTrendingAlbumPage() {
    let [albums, setAlbums] = useState(null);
    let [offset, setOffset] = useState(0);
    useEffect(() => {
        async function getData() {
            try {
                setAlbums(null);
                let albumResponse = await dataHandler.apiGet(`/api/albums/top-trending?offset=${offset}`);
                setAlbums(albumResponse);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [offset]);

    function decreaseOffset() {
        if (offset !== 0 && albums !== null) {
            setOffset(offset - 10);
        }
    }

    function increaseOffset() {
        if (albums !== null) {
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
        if (arrayType === "albums") {
            const rearrangedArray = swapArrayItems(albums, selectedItemId);
            setAlbums(rearrangedArray);
        }
    }

    return (
        <div className="trending-content-wrapper">
            <div className="card-redirect">
                <p onClick={decreaseOffset}>Previous page</p>
                <p onClick={increaseOffset}>Next Page</p>
            </div>
            <TopTrending trendingItems={albums} changeCardOrder={changeCardOrder} apiRouteOption="albums" cardType="albums"/>
        </div>
    );
}

export default TopTrendingAlbumPage;