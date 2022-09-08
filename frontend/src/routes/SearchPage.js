import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {dataHandler} from "../data/DataHandler";
import {useState} from "react";


function SearchPage() {
    let searchIcon = <FontAwesomeIcon icon={faSearch}/>;
    const {type} = {type: useParams()}
    const [searchedData, setSearchedData] = useState();

    useEffect(() => {
        async function getData() {
            try {
                let searchResponse = await dataHandler.apiGet(`/api/search/${type.type}/${type.searchInput}`);
                setSearchedData(searchResponse);
                console.log(searchedData);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

    },[type]);

    return(
        <section>
            <div className="searchedTitleHolder">
                {searchIcon}Your search result's on <h3>{type.type} {type.searchInput}</h3>
            </div>
            <div className="other-cards">

            </div>
        </section>
    )
}

export default SearchPage;