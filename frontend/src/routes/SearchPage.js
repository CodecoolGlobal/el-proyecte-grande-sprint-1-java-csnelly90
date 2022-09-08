import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {dataHandler} from "../data/DataHandler";
import {useState} from "react";
import CardView from "../components/CardView";
import '../HomePage.css'


function SearchPage() {
    let searchIcon = <FontAwesomeIcon icon={faSearch}/>;
    const {type} = {type: useParams()}
    const [searchedData, setSearchedData] = useState(null);
    document.title = `${type.type.toUpperCase()}` + " | " + `${type.searchInput.toUpperCase()}`

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

    }, [type]);
    if (searchedData !== null) {
        return (
            <div className="search-result-container">
                <div className="result-header">
                    {searchIcon}Your <strong>{type.type.toUpperCase()}</strong> search results on <strong>{type.searchInput.toUpperCase()}</strong>
                </div>
                <div className="other-cards">
                    {searchedData.map((item) => (
                        <CardView item={item} key={item.id} cardType="other" apiOption={item.type}
                                  handleClick={null}/>
                    ))
                    }
                </div>
            </div>
        )
    }
}


export default SearchPage;