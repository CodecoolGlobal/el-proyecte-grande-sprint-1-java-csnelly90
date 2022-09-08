import React from "react";
import {useNavigate} from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

function createRedirect(props, navigate) {
    let shouldShow = false;
    if (props.apiOption !== "songs" && props.cardType === "main") shouldShow = true;

    return (
        <div className="card-redirect" style={{display: shouldShow === false ? "none" : "flex"}}>
            <p onClick={() => navigate(`/${props.apiOption}/` + props.item.id)}>GO TO PAGE</p>
        </div>
    );
}

function createMusicPlayer(props) {
    let shouldShow = false;
    if (props.apiOption === "songs") {
        if ((props.isMainPage === true && props.cardType === "main")
            || (props.isMainPage === false && props.cardType === "other")) shouldShow = true;
    }

    return (
        <div className="card-player" style={{display: shouldShow === false ? "none" : "flex"}}>
            <p>This is a music player</p>
        </div>
    );
}

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

function CardView(props) {
    const navigate = useNavigate();

    return (
        <div className="card"
             onClick={props.cardType !== "main" ? () => props.handleClick(props.apiOption, props.item.id) : null}
             style={{cursor: props.cardType !== "main" ? "pointer" : "default"}}
        >
            <div className="card-image">
                {createImage(props)}
            </div>
            <div className="card-info">
                <p className="card-name"
                   style={{fontSize: props.cardType !== "main" ? "1rem" : "2rem"}}>{props.item.name}</p>
                <p className="card-type">{props.item.type}</p>
                <p className="card-bio"
                   style={{display: props.cardType !== "main" ? "none" : "flex"}}>{props.item.blurbs}</p>
            </div>
            {createMusicPlayer(props)}
            {createRedirect(props, navigate)}
        </div>
    );
}

export default CardView;