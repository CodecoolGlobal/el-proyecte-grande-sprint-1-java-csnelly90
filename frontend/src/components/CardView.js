import React from "react";
import {useNavigate} from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

function createImageDiv(props) {
    return (
        <ReactImageFallback
            src={props.image}
            fallbackImage={`/default_${props.apiOption.slice(0, props.apiOption.length - 1)}_cover.jpg`}
            initialImage={props.image}
            alt=""
        />
    );
}

function CardView(props) {
    const navigate = useNavigate();

    return (
        <div className="card" onClick={() => props.changeCardOrder(props.apiOption, props.id)}>
            <div className="card-image">
                {createImageDiv(props)}
            </div>
            <div className="card-info">
                <p className="card-name">{props.name}</p>
                <p className="card-type">{props.type}</p>
            </div>
            <div className="card-redirect" style={{display: props.cardType !== "main" ? "none" : "flex"}}>
                <p onClick={() => navigate(`/${props.apiOption}/` + props.id)}>GO TO PAGE</p>
            </div>
        </div>
    );
}

export default CardView;