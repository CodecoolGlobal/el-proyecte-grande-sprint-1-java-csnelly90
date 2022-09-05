import React, {useState} from "react";
import '../searchbar.css';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons';
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const options = [
    {"name": "Album", "icon": faCompactDisc},
    {"name": "Artists", "icon": faPerson},
    {"name": "Songs", "icon": faMusic}
]

function SearchBar() {
        const [isActive, setIsActive]=useState(false);
        const [selected, setSelected]=useState("Choose one");


    return (
        <div id="search-container">
            <div id="icons-container">
                <div className="dropdown" id="dropdown-button" onClick={(e) => {setIsActive(!isActive)}}>
                    <span>{selected} </span> <span><FontAwesomeIcon icon={faCaretDown} /></span>
                </div>
                {isActive && (
                    <div className="dropdown-content">
                        {options.map((option, index)=>(
                            <div key={index} onClick={(e)=> {
                                setSelected(option.name);
                                setIsActive(false);}}
                                className="dropdown-item">
                                <FontAwesomeIcon icon={option.icon}></FontAwesomeIcon> {option.name}
                            </div>
                        ))}
                    </div>
                    )}

            </div>
            <div>
                <input type="text" placeholder="What you'd like to find?"/>
            </div>
        </div>
    )
}

export default SearchBar;