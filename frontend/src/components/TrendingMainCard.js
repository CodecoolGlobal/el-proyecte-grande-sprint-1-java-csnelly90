import React from "react";
import {useNavigate} from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

function createImage(props) {
    return (
        <ReactImageFallback
            src={props.item.image}
            fallbackImage={`/default_${props.apiOption}_cover.jpg`}
            initialImage={props.item.image}
            alt=""
        />
    );
}

function createArtistNameDiv(props) {
    if (props.apiOption !== "artists") {
        return (
            <p>Artist: {props.item.artistName}</p>
        );
    }
}

function createYearDiv(props) {
    if (props.apiOption !== "artists") {
        return (
            <p className="card-year">{props.item.released}</p>
        );
    }
}

function TrendingMainCard(props) {
    const navigate = useNavigate();

    return (
        <div className="card" style={{cursor: "default"}}>
            <div className="card-image">
                {createImage(props)}
            </div>
            <div className="card-info">
                <p className="card-name" style={{fontSize: "2rem"}}>{props.item.name}</p>
                {createArtistNameDiv(props)}
                <p className="card-bio">{props.item.blurbs}</p>
                <div className="card-type-container">
                    <p className="card-type">{props.item.type}</p>
                    {createYearDiv(props)}
                </div>
            </div>
            <div className="card-redirect" style={{display: props.apiOption === "songs" ? "none" : "flex"}}>
                <p onClick={() => navigate(`/${props.apiOption}/` + props.item.id)}>GO TO PAGE</p>
            </div>
        </div>
    );
}

export default TrendingMainCard;