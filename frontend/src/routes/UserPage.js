import React from "react";
import "../UserPage.css";
import UserProfileForm from '../components/UserProfileForm';
import UserProfileImage from '../components/UserProfileImage';
import userImagePath from '../profileimages/userImage.png';
import UserLikes from "../components/UserLikes";

function UserPage() {
    const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        phone: '+36708886666'
    };

    const imgPath = {userImagePath};

    return (
        <div id="user-main-container">
            <div id="user-data-container">
                <div id="user-pic-container">
                    <UserProfileImage data={imgPath} />
                </div>
                <div id="user-info-container">
                    <UserProfileForm data={data} />
                </div>
            </div>
            <UserLikes />
        </div>
    );
}

export default UserPage;