import React from "react";
import {useNavigate} from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

function createImageDiv(props) {
    return (
        <ReactImageFallback
            src={props.item.image}
            fallbackImage={`/default_${props.apiOption.slice(0, props.apiOption.length - 1)}_cover.jpg`}
            initialImage={props.item.image}
            alt=""
        />
    );
}

function CardView(props) {
    const navigate = useNavigate();

    return (
        <div className="card"
             onClick={props.cardType !== "main" ? () => props.handleClick(props.apiOption, props.item.id) : null}
             style={{cursor: props.cardType !== "main" ? "pointer" : "default"}}
        >
            <div className="card-image">
                {createImageDiv(props)}
            </div>
            <div className="card-info">
                <p className="card-name" style={{fontSize: props.cardType !== "main" ? "1rem" : "2rem"}}>{props.item.name}</p>
                <p className="card-type">{props.item.type}</p>
                <p className="card-bio" style={{display: props.cardType !== "main" ? "none" : "flex"}}>{props.item.blurbs}</p>
            </div>
            <div className="card-redirect" style={{display: props.cardType !== "main" ? "none" : "flex"}}>
                <p onClick={() => navigate(`/${props.apiOption}/` + props.item.id)}>GO TO PAGE</p>
            </div>
        </div>
    );
}

export default CardView;