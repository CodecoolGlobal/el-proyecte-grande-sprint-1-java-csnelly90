import React from "react";
import "../ArtistPage.css"
import CardView from "./CardView";
import {useNavigate} from "react-router-dom";


function ArtistAlbums(props) {
    const navigate = useNavigate();

    return (
        <div className="card-wrapper">
            {props.albumItems == null ? (<h1>LOADING ALBUMS...</h1>) :
                (props.albumItems.map((item) =>(
                        <CardView item={item}
                                  key={item.id}
                                  cardType="other"
                                  apiOption={props.apiRouteOption}
                                  handleClick={() => navigate(`/${props.apiRouteOption}/` + item.id)}/>
                    ))
                )}
        </div>
    )
}

export default ArtistAlbums;

