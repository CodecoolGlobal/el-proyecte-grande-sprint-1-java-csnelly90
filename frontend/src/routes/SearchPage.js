import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function SearchPage(props) {
    let searchIcon = <FontAwesomeIcon icon={faSearch}/>;

    return(
        <section>
            <div className="searchedTitleHolder">
                <p> <span>{searchIcon}</span>Your search result's on <h3>{props.searchPhrase.toUpperCase()}</h3></p>
            </div>
            <div className="other-cards">

            </div>
        </section>
    )
}

export default SearchPage;