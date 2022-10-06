import React from 'react'

function TabsSelector(props) {

    return(
        <div id="user-likes-tab-container">
            <div
                className={props.toggleState === 1 ? "likes-tab active-tab" : "likes-tab"}
                onClick={() => props.setActiveTab(1)}
            >
                {props.tabHeader}
            </div>
            <div
                className={props.toggleState === 2 ? "likes-tab active-tab" : "likes-tab"}
                onClick={() => props.setActiveTab(2)}
            >
                Comments
            </div>
        </div>
        );
}

export default TabsSelector;