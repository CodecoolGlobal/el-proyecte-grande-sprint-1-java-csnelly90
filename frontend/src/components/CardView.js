import React from "react";
import CardImage from "./CardImage";

function CardView(props) {
    return (
        <div className="card"
             onClick={props.cardType !== "main" ? () => props.handleClick(props.apiOption, props.item.id) : null}
        >
            <div className="card-image">
                <CardImage image={props.item.image} apiOption={props.apiOption}/>
            </div>
            <div className="card-info" style={{justifyContent: "space-between"}}>
                <h3 className="card-name">{props.item.name}</h3>
                <p className="card-artist-name" style={{display: props.apiOption === "artists" ? "none" : "box"}}>
                    {props.item.artistName}
                </p>
            </div>
            <div className="card-type-container">
                <p className="card-type">{props.item.type}</p>
                <p className="card-year">{props.item.released}</p>
            </div>
        </div>
    );
}

export default CardView;