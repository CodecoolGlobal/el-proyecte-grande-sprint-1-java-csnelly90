import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {dataHandler} from "../data/DataHandler";
import {useState} from "react";
import CardView from "../components/CardView";
import '../HomePage.css'
import React from "react";


function SearchPage() {
    const navigate = useNavigate();
    let searchIcon = <FontAwesomeIcon icon={faSearch}/>;
    const {searchedType, searchInput} = useParams()
    const [searchedData, setSearchedData] = useState(null);
    document.title = `${searchedType.toUpperCase()}` + " | " + `${searchInput.toUpperCase()}`

    useEffect(() => {
        async function getData() {
            try {
                let searchResponse = await dataHandler.apiGet(`/api/search/${searchedType}/${searchInput}`);
                setSearchedData(searchResponse);
            } catch (error) {
                console.log(error);
            }
        }

        getData();

    }, [searchedType, searchInput]);

    const navigateToPage = function (apiOption, itemId) {
        navigate(`/${apiOption + "s"}/` + itemId)
    }

    if (searchedData !== null) {
        let cardType = searchedType.toLowerCase() + "s";

        return (
            <div className="search-result-container">
                <div className="result-header">
                    {searchIcon}Your <strong>{searchedType.toUpperCase()}</strong> search results
                    on <strong>{searchInput.toUpperCase()}</strong>
                </div>
                <div className="other-cards">
                    {searchedData.map((item) => (
                            <CardView item={item}
                                      key={item.id}
                                      cardType={cardType}
                                      apiOption={item.type}
                                      handleClick={navigateToPage}
                            />
                        )
                    )
                    }
                </div>
            </div>
        )
    }
}


export default SearchPage;