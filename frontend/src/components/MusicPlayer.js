import React from "react";

function MusicPlayer(props){
    return(
        <audio controls>
            <source src={props.song} type="audio/mpeg"/>
        </audio>
    )
}
export default MusicPlayer;