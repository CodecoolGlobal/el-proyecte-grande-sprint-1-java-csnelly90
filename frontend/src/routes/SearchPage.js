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
    if (searchedData !== null){
        return(
            <section >
                   <p> {searchIcon}Your search result's on <h3>{type.type} {type.searchInput}</h3></p>
                <div className="other-cards">
                    {searchedData.map((item) =>(
                            <CardView item={item} key={item.id} cardType="other"  apiOption={item.type}
                                      handleClick={null}/>
                    ))
                    }
                </div>
            </section>
        )
    }
}


export default SearchPage;