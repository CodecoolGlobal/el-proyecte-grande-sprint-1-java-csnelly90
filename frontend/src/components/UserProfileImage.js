import React, {Component} from "react";

class UserProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPath: props.data.userImagePath
        };
    }

    render() {
        return (
            <div id="avatar-container">
                <img src={this.state.imgPath} alt="user-image"/>
            </div>
        );
    }
}

export default UserProfileImage;