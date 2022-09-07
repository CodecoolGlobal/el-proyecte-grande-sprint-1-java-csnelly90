import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams, useSearchParams} from "react-router-dom";


function SearchPage(props) {
    let searchIcon = <FontAwesomeIcon icon={faSearch}/>;
    const {type} = {type: useParams()}

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