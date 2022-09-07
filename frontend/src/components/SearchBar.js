import React, {useState} from "react";
import '../searchbar.css';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons';
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const options = [
    {"name": "Album", "icon": faCompactDisc},
    {"name": "Artist", "icon": faPerson},
    {"name": "Song", "icon": faMusic}
]

function SearchBar() {
        const [isActive, setIsActive]=useState(false);
        const [selected, setSelected]=useState("Choose one");
        const [text, setText] = useState("");
        const navigate = useNavigate();
        const updateText = () => {
            setText(document.getElementById("userInput").value);

        }

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
                <input type="text" id="userInput" onChange={updateText}/>
                <button onClick={()=> navigate(`/search/type=${selected}/userSearch=${text}`)}>
                    <span><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;