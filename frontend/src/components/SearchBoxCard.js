import React from "react";


function SearchBoxCard(props) {
    return(
        <div onClick={props.data.type !== "songs" ? () => props.handleClick(props.apiOption, props.data.id) : null}>
            <span><strong>{props.data.name}</strong></span>
            <br/>
            <span>{props.data.type}</span>
        </div>
    )
}
export default SearchBoxCard;