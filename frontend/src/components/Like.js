import React, {useEffect, useState} from "react";
import "../HomePage.css"
import {dataHandler} from "../data/DataHandler";
import {useAuth} from "../security/auth";
import {faHeart as EmptyHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as FullHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Like(props) {
    const [like, setLike] = useState("Like");
    const [likeNumber, setLikeNumber] = useState(0);
    const auth = useAuth();

    useEffect(() => {
        async function getData() {
            try {
                let number = await dataHandler.apiGet(`/api/likes/likes?itemId=${props.itemid}`);
                setLikeNumber(number);
                if (auth.user) {
                    let likeStatus = await dataHandler.apiGet(`/api/likes/isliked?itemId=${props.itemid}&userName=${auth.user.username}`);
                    if (likeStatus) {
                        setLike("disLike");
                    } else {
                        setLike("Like");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [likeNumber]);

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
            let number = await dataHandler.apiGet(`/api/likes/likes?itemId=${props.itemid}`);
            setLikeNumber(number);
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
                {like === "Like" ? (<div className="count">
                                        <FontAwesomeIcon icon={EmptyHeart}/>
                                        <div></div>
                                        <p className={likeNumber === 0 ? "hide" : "display"}>{likeNumber}</p>
                                    </div>) : (<div className="count">
                                        <FontAwesomeIcon icon={FullHeart}/>
                                        <div></div>
                                        <p className={likeNumber === 0 ? "hide" : "display"}>{likeNumber}</p>
                                    </div>)}
            </div>) : (<div></div>)}
        </div>
    )
}

export default Like;