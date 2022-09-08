import ReactImageFallback from "react-image-fallback";
import React from "react";

function CardImage(props) {
    return (
        <ReactImageFallback
            src={props.image}
            fallbackImage={`/default_${props.apiOption}_cover.jpg`}
            initialImage={props.image}
            alt=""
        />
    );
}

export default CardImage;