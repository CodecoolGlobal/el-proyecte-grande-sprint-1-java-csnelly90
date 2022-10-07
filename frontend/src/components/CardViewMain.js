import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CardImage from "./CardImage";
import MusicPlayer from "./MusicPlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {dataHandler} from "../data/DataHandler";

const options = [
    {"name": "Like", "icon": faHeart},
    {"name": "disLike", "icon": faHeartCircleCheck}
]

function CardViewMain(props, user) {
    const navigate = useNavigate();
    const [like, setLike]=useState("Like");

    const payload = {
        "userName": "balazs",
        "likedItem": `${props.item.id}`
    };

    async function getData() {
        try {
            // console.log(user.name);

            if (like === "Like") {
                await dataHandler.apiPost("/api/likes/like", payload);
            } else {
                await dataHandler.apiPost("/api/likes/dislike", payload);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="card" style={{cursor: "default"}}>
            <div className="card-image">
                <CardImage image={props.item.image} apiOption={props.apiOption} />
            </div>
            <div className="card-info">
                <p className="card-name" style={{fontSize: "2rem"}}>{props.item.name}</p>
                <h3 className="card-artist-name" style={{display: props.apiOption === "artists" ? "none" : "box"}}>
                    Artist: {props.item.artistName}
                </h3>
                <h3 className="card-year">{props.item.released}</h3>
                <h3 style={{display: props.apiOption !== "artists" ? "none" : "flex"}}>Bio:</h3>
                <p className="card-bio" style={{display: props.apiOption !== "artists" ? "none" : "flex"}}>{props.item.blurbs}</p>
            </div>
            <div className="card-player" style={{display: props.cardType !== "songs" ? "none" : "box"}}>
                <MusicPlayer song={props.item.previewURL}/>
            </div>
            <div className="card-type-container">
                <div className="card-redirect" style={{display: props.apiOption === "songs" ? "none" : "flex"}}>
                    <p onClick={() => navigate(`/${props.apiOption}/` + props.item.id)}>GO TO PAGE</p>
                </div>
                <div className="card-redirect"
                    onClick={(e) => {
                    if(like === "Like") {
                        setLike("disLike");
                        getData();
                    } else {
                        setLike("Like");
                    }
                }}>
                    {/*<FontAwesomeIcon icon={options[like]}/>*/}
                    <p>{like}</p>
                </div>
                <p className="card-type">{props.item.type}</p>
            </div>

        </div>
    );
}

export default CardViewMain;