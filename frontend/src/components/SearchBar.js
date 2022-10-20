import React, {useState, useEffect} from "react";
import '../searchbar.css';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons';
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {dataHandler} from "../data/DataHandler";
import SearchBoxCard from "./SearchBoxCard";
import Swal from 'sweetalert2';
import {useAuth} from "../security/auth";


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
        const [searchResultContainer, setSearchResultContainer] = useState(false);
        const navigate = useNavigate();
        const auth = useAuth();
        document.getElementsByTagName("body")[0].addEventListener("click", ()=>setSearchResultContainer(false))

        const navigateToTargetPage = function (apiOption, itemId) {
            navigate(`/${apiOption}/` + itemId);
        }
        const navigateToSearchPage = function(selected, text){
            if(selected !== "Choose one" && text.trim() !=="" ){
                navigate(`/search/type=${selected}/userSearch=${text}`);
            } else{
                Swal.fire({
                    position: 'top',
                    title: 'Please select an item',
                    timer:1000,
                    background:'#121218',
                    color: '#03e9f4',
                    showConfirmButton:false
                })
            }

        }
        const updateText = function (input){
            if(auth.user && input.trim() !=="" && selected !== "Choose one"){
                setText(input);
                console.log(text)
            }
        }

        useEffect(() => {
            async function getData() {
                try {
                    if (selected !=="Choose one" && text!==""){
                        let response = await dataHandler.apiGet(`/api/search/${selected}/${text}`);
                        if(response){
                            setSearchResponse(response);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
            setSearchResultContainer(true)
        }, [text]);




    return (
        <div id="search-container">
            <div id="icons-container">
                <div className="dropdown" id="dropdown-button" onClick={() => {
                    setIsActive(!isActive)
                }}>
                    <span>{selected} </span> <span><FontAwesomeIcon icon={faCaretDown}/></span>
                </div>
                {isActive && (
                    <div className="dropdown-content">
                        {options.map((option, index) => (
                            <div key={index}
                                 onClick={(e) => {
                                     setSelected(option.name);
                                     setIsActive(false);
                                 }}
                                 className="dropdown-item">
                                <FontAwesomeIcon icon={option.icon}/>
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div id="search-input-container">
                <input type="text" id="userInput"
                       onChange={(event) => updateText(event.target.value)}
                       onClick={() => {
                        if (text!=="") setSearchResultContainer(true)}} />

                {searchResponse.length !== 0 && text !=="" && searchResultContainer &&(
                    <div className="search-results-holder">
                        {searchResponse.map((item) => (
                            <div key={item.id} className="search-result-card" onClick={
                                ()=>setSearchResultContainer(false)}>
                               <SearchBoxCard data={item}
                                              key={item.id}
                                              apiOption={item.type + "s"}
                                              handleClick={navigateToTargetPage}
                               />
                            </div>
                            )
                        )}
                    </div>
                )}

                <button onClick={ ()=> navigateToSearchPage(selected, text)}>
                    <span><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;