import React from "react";
import {useNavigate} from "react-router-dom";
import CardImage from "./CardImage";

function TrendingMainCard(props) {
    const navigate = useNavigate();

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
            <div className="card-type-container">
                <p className="card-type">{props.item.type}</p>
            </div>
            <div className="card-redirect" style={{display: props.apiOption === "songs" ? "none" : "flex"}}>
                <p onClick={() => navigate(`/${props.apiOption}/` + props.item.id)}>GO TO PAGE</p>
            </div>
        </div>
    );
}

export default TrendingMainCard;