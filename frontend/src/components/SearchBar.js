import React, {useState} from "react";
import '../searchbar.css';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons';
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {dataHandler} from "../data/DataHandler";

const options = [
    {"name": "Album", "icon": faCompactDisc},
    {"name": "Artist", "icon": faPerson},
    {"name": "Song", "icon": faMusic}
]

function SearchBar() {
        const [isActive, setIsActive]=useState(false);
        const [selected, setSelected]=useState("Choose one");
        const [text, setText] = useState("");
        const [searchResponse, setSearchResponse] = useState([]);
        const navigate = useNavigate();
        const updateText = () => {
            setText(document.getElementById("userInput").value);
        }

        useEffect(() => {
            async function getData() {
                try {
                    if (selected!=="Choose one"){
                        let response = await dataHandler.apiGet(`/api/search/${selected}/${text}`);
                        if(response){
                            setSearchResponse(response);
                        }
                        console.log(searchResponse.length);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData();

        }, [text]);




    return (
        <div id="search-container">
            <div id="icons-container">
                <div className="dropdown" id="dropdown-button" onClick={() => {
                    setIsActive(!isActive)}}>
                    <span>{selected} </span> <span><FontAwesomeIcon icon={faCaretDown} /></span>
                </div>
                {isActive && (
                    <div className="dropdown-content">
                        {options.map((option, index)=>(
                            <div key={index} onClick={(e)=> {
                                setSelected(option.name);
                                setIsActive(false);}}
                                className="dropdown-item">
                                <FontAwesomeIcon icon={option.icon}></FontAwesomeIcon>
                                {option.name}
                            </div>
                        ))}
                    </div>
                    )}

            </div>
            <div>
                <input type="text" id="userInput" onChange={updateText} />

                {searchResponse.length !== 0 && text !=="" && (
                    <div className="search-results-holder">
                    {searchResponse.map((item, index) => (
                        <div key={index} className="search-result-card">
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                        </div>

                    ))}
                </div>
                    )}

                <button onClick={()=> navigate(`/search/type=${selected}/userSearch=${text}`)}>
                    <span><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;