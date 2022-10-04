import React, {useState} from "react";

const handleSubmit = (event) => {
    event.preventDefault();
    // console.log()
    //TODO: finish
}

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3, 20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6, 40}$/;

function SignupForm() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section id="login-signup-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Username:{" "}
                    <input type="text" value={username} autoComplete="on" placeholder="Enter a username"
                           onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    First name:{" "}
                    <input type="text" value={firstName} placeholder="Enter your first name"
                           onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                    Last name:{" "}
                    <input type="text" value={lastName} placeholder="Enter your last name"
                           onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label>
                    Email:{" "}
                    <input type="email" value={email} placeholder="Enter your email"
                           onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:{" "}
                    <input type="password" value={password} autoComplete="off" placeholder="Enter a password"
                           onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>Sign up</button>
            </form>
        </section>
    );
}

export default SignupForm;
