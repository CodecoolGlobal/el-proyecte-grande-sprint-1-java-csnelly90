import React, {useState} from 'react'
import {useEffect} from "react";
import {dataHandler} from "../data/DataHandler";

function Comments(props) {
    let [comments, setComments] = useState([]);
    useEffect(()=>{
        async function getData() {
            let commentsResponse = await dataHandler.apiGet(`/api/comments/get/${props.id}`);
            setComments(commentsResponse);

        }
        getData();
    }, [props.id])

    return(
        <div>
            {comments.length === 0 ?( <h1>There's no comment over here :(</h1>) :
                (comments.map((comment)=>(
                    <div>
                        <p><strong>{comment.username}</strong></p>
                        <p><em>{comment.text}</em></p>
                    </div>
                )))
            }
        </div>
    )

}

export default Comments;