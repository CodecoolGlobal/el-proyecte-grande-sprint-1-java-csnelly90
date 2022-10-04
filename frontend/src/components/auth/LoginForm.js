import React, {useState} from "react";
import {useAuth} from "../../security/auth";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event, username, password) => {
        event.preventDefault();

        const payload = {
            "username": username,
            "password": password
        }

        auth.login(payload);
        navigate("/");
    }

    return (
        <form onSubmit={(event) => handleSubmit(event, username, password)} className="login-form">
            <div><label htmlFor="username-field">USERNAME{" "}</label></div>
            <input type="text" value={username} id="username-field" autoComplete="on" placeholder="Enter a username"
                   required onChange={(e) => setUsername(e.target.value)}/>
            <div><label htmlFor="pwd-field">PASSWORD{" "}</label></div>
            <input type="password" value={password} id="pwd-field" placeholder="Enter a password"
                   required onChange={(e) => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>
    );
}

export default LoginForm;
