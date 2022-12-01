import {useEffect, useState} from "react";
import "../UserPage.css"
import UserLikesTab from "./UserLikesTab";
import UserLikesContent from "./UserLikesContent";
import {dataHandler} from "../data/DataHandler";
import {useAuth} from "../security/auth";

function UserLikes() {
    const [toggleState, setToggleState] = useState(1);
    let [likedItems, setLikedItems] = useState(null);
    const auth = useAuth();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        async function getData() {
            try {
                if (auth.user) {
                    let items = await dataHandler.apiGet(`/api/likes/get-all?userName=${auth.user.username}`);
                    setLikedItems(items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <div id="user-likes-container">
            <UserLikesTab
                toggleState={toggleState}
                setToggleState={setToggleState}
                toggleTab={toggleTab}
            />
            <UserLikesContent
                toggleState={toggleState}
                setToggleState={setToggleState}
                toggleTab={toggleTab}
                likedItems={likedItems}
            />
        </div>
    );
}

export default UserLikes;