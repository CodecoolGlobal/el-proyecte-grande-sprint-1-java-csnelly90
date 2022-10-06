import React, {useEffect, useState} from "react";
import {useAuth} from "../security/auth";
import {dataHandler} from "../data/DataHandler";

function UserProfileForm() {
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchUserData() {
            return await dataHandler.apiGet(`/api/users/username/${auth.user.username}`);
        }

        fetchUserData()
            .then(response => {
                setUsername(response.username);
                setFirstName(response.firstName);
                setLastName(response.lastName);
                setEmail(response.email);
            });
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: post user data to database
        console.log(`Your update was submitted: ${username} ${email}`);
    }

    return (
        <form id="user-info-form">
            <div id="user-info-box">
                <div className="form-group">
                    <label>
                        First Name:
                        <input type="text" defaultValue={firstName} onChange={handleFirstNameChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Last Name:
                        <input type="text" defaultValue={lastName} onChange={handleLastNameChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Username:
                        <input type="text" defaultValue={username} onChange={handleUsernameChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Email:
                        <input type="email" defaultValue={email} onChange={handleEmailChange}/>
                    </label>
                </div>
            </div>
            <div id="user-submit-box">
                <button onClick={handleSubmit}>Update</button>
            </div>
        </form>
    );
}

export default UserProfileForm;