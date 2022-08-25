import React from "react";
import "../UserPage.css";
import UserProfileForm from '../components/UserProfileForm';
import UserProfileImage from '../components/UserProfileImage';
import userImagePath from '../profileimages/userImage.png';

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
            <div id="user-likes-container">
                <div id="user-likes-tab-container">
                    Favourite artists | Favourite albums | Favourite songs
                </div>
                <div id="user-likes-content-container">
                    Liked artists
                </div>
            </div>
        </div>
    );
}

export default UserPage;