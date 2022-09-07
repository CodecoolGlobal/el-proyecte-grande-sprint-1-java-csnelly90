import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import CardView from "./CardView";

function TopTrending(props) {
    const trendingIcon = <FontAwesomeIcon icon={faArrowTrendUp} />;

    return (
            <section>
                <div className="top-trending-title">
                    <h3>TRENDING {props.apiRouteOption.toUpperCase()} <span id="trending-icon">{trendingIcon}</span></h3>
                    <p>Top 10 trending {props.apiRouteOption} this week</p>
                </div>
                <div className="top-trending-section">
                    <div className="main-card">
                        {props.trendingItems.slice(0, 1).map(({name, id, image, type}) => (
                            <CardView key={id} name={name} id={id} image={image} type={type} cardType="main" apiOption={props.apiRouteOption}/>
                        ))}
                    </div>
                    <div className="other-cards">
                        {props.trendingItems.slice(1, props.trendingItems.length).map(({name, id, image, type}) => (
                            <CardView key={id} name={name} id={id} image={image} type={type} cardType="other"
                                      apiOption={props.apiRouteOption}
                                      changeCardOrder={props.changeCardOrder}/>
                        ))}
                    </div>
                </div>
            </section>
    );
}

export default TopTrending;