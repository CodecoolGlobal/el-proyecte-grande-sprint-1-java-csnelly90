import React, {useState} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import {useAuth} from "../security/auth";
import {faHeart as EmptyHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as FullHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Like(props) {
    const [like, setLike] = useState("Like");
    const auth = useAuth();

    function getPayload() {
        let payload = {};
        if (auth.user) {
            payload = {
                "userName": `${auth.user.username}`,
                "likedItem": `${props.itemid}`
            };
        } else {
            payload = {
                "userName": `none`,
                "likedItem": `${props.itemid}`
            };
        }
        return payload;
    }

    async function sendLike() {
        let payload = getPayload();
        try {
            if (like === "Like") {
                await dataHandler.apiPost("/api/likes/like", payload);
            } else {
                await dataHandler.apiPost("/api/likes/dislike", payload);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="like">
            {auth.user ? (<div onClick={(e) => {
                                   if (like === "Like") {
                                       setLike("disLike");
                                       sendLike();
                                   } else {
                                       setLike("Like");
                                       sendLike();
                                   }
                               }}>
                {like === "Like" ? (<FontAwesomeIcon icon={EmptyHeart}/>) : (<FontAwesomeIcon icon={FullHeart}/>)}
            </div>) : (<div></div>)}
        </div>
    )
}

export default Like;