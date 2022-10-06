import React, {useState} from "react";
import {useAuth} from "../../security/auth";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event, username, password) => {
        event.preventDefault();

        if (username.trim().length === 0 || password.trim().length === 0) {
            setErrorMsg("You need to provide a username and password.");
            return;
        }

        const payload = {
            "username": username,
            "password": password
        }

        const response = await auth.login(payload);

        if (response === "success") {
            setErrorMsg("");
            navigate("/");
        } else if (response === "invalid") {
            setErrorMsg("Invalid username or password.")
        } else {
            setErrorMsg("There was a problem. Please check back later.");
        }
    }

    return (
        <div id="login-signup-container">
            <p className={errorMsg ? "error-msg": "offscreen"} aria-live="assertive">{errorMsg}</p>
            <form onSubmit={(event) => handleSubmit(event, username, password)} className="login-form">
                <div><label htmlFor="username-field">USERNAME{" "}</label></div>
                <input type="text" value={username} id="username-field" autoComplete="on" placeholder="Enter a username"
                       required onChange={(e) => setUsername(e.target.value)}/>
                <div><label htmlFor="pwd-field">PASSWORD{" "}</label></div>
                <input type="password" value={password} id="pwd-field" placeholder="Enter a password"
                       required onChange={(e) => setPassword(e.target.value)}/>
                <button disabled={!username || !password}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
