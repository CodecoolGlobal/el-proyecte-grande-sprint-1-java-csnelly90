import React, {useEffect} from 'react'
import {useState} from "react";
import {dataHandler} from "../data/DataHandler";
import TabsSelector from "./TabsSelector";
import ActiveTabContent from "./ActiveTabContent";


function TabsManager(props) {
    let [contentInfo, setContentInfo] = useState([]);
    const [activeTab, setActiveTab] = useState(1);


    const toggleActiveTab = (index) => {
        setActiveTab(index);
    };

    useEffect(()=>{
            async function getData() {
                let albumResponse = await dataHandler.apiGet(`/api/${props.contentType}/` + props.id);
                setContentInfo(albumResponse);
            }
        getData();
    }, [props.id])

    if (contentInfo!==[] && contentInfo !== undefined){
        return(
            <div id="user-likes-container">
               <TabsSelector activeTab={activeTab}
                             setActiveTab={toggleActiveTab}
                             tabHeader={props.contentType}
               />
                <ActiveTabContent contentType={props.contentType} items={contentInfo} activeState={activeTab}
                                  id={props.id}/>
            </div>
        )
    }
}

export default TabsManager;