import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowTrendUp} from '@fortawesome/free-solid-svg-icons'
import CardView from "./CardView";
import CardViewMain from "./CardViewMain";
import {useNavigate} from "react-router-dom";

function TopTrending(props) {
    const navigate = useNavigate();
    const trendingIcon = <FontAwesomeIcon icon={faArrowTrendUp}/>;

    if (props.trendingItems === null || props.trendingItems.length === 0) {
        return (
            <div className="loading">
                <h1>LOADING TOP TRENDING {props.apiRouteOption.toUpperCase()}...</h1>
            </div>
        );
    } else {
        return (
            <section>
                <div className="top-trending-title">
                    <h3 onClick={() => navigate(`/${props.apiRouteOption}/top-trending`)}>TRENDING {props.apiRouteOption.toUpperCase()} <span id="trending-icon">{trendingIcon}</span>
                    </h3>
                    <p>Top 10 trending {props.apiRouteOption} this week</p>
                </div>
                <div className="top-trending-section">
                    <div className="main-card">
                        {props.trendingItems.slice(0, 1).map((item) => (
                            <CardViewMain key={item.id}
                                          item={item}
                                          apiOption={props.apiRouteOption}
                                          cardType={props.cardType}
                            />
                        ))}
                    </div>
                    <div className="other-cards">
                        {props.trendingItems.slice(1, props.trendingItems.length).map((item) => (
                            <CardView key={item.id}
                                      item={item}
                                      apiOption={props.apiRouteOption}
                                      handleClick={props.changeCardOrder}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default TopTrending;