import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowTrendUp} from '@fortawesome/free-solid-svg-icons'
import CardView from "./CardView";
import TrendingMainCard from "./TrendingMainCard";

function TopTrending(props) {
    const trendingIcon = <FontAwesomeIcon icon={faArrowTrendUp}/>;

    if (props.trendingItems == null) {
        return (
            <div className="loading">
                <h1>LOADING TOP TRENDING {props.apiRouteOption.toUpperCase()}...</h1>
            </div>
        );
    } else {
        return (
            <section>
                <div className="top-trending-title">
                    <h3>TRENDING {props.apiRouteOption.toUpperCase()} <span id="trending-icon">{trendingIcon}</span>
                    </h3>
                    <p>Top 10 trending {props.apiRouteOption} this week</p>
                </div>
                <div className="top-trending-section">
                    <div className="main-card">
                        {props.trendingItems.slice(0, 1).map((item) => (
                            <TrendingMainCard key={item.id}
                                      item={item}
                                      apiOption={props.apiRouteOption}
                            />
                        ))}
                    </div>
                    <div className="other-cards">
                        {props.trendingItems.slice(1, props.trendingItems.length).map((item) => (
                            <CardView item={item}
                                      key={item.id}
                                      cardType="other"
                                      apiOption={props.apiRouteOption}
                                      handleClick={props.changeCardOrder}
                                      isMainPage={true}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default TopTrending;