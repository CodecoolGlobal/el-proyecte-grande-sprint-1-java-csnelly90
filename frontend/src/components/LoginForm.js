import React, {useState} from "react";
import {useAuth} from "../security/auth";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event, username, password) => {
        event.preventDefault();

        const payload = {
            username: username,
            password: password
        }

        auth.login(payload);

        navigate("/");
    }

    return (
        <form onSubmit={(event) => handleSubmit(event, username, password)} className="login-form">
            <label>
                Username:{" "}
                <input type="text" value={username} autoComplete="on" placeholder="Enter a username"
                       onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:{" "}
                <input type="password" value={password} autoComplete="off" placeholder="Enter a password"
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button>Login</button>
        </form>
    );
}

export default LoginForm;
