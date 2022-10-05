import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../security/auth";
import {useNavigate} from "react-router-dom";

const USER_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{6,40}$/;

function SignupForm() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwdMatch, setPwdMatch] = useState("");

    // used for input frontend validation before submit (format only, no fetch)
    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    // checks whether fields that need validation are in focus
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === pwdMatch);
    }, [password, pwdMatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);

        if (!v1 || !v2 || !v3) {
            setErrorMsg("Invalid input");
            return;
        }

        const payload = {
            "username": username,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        }

        const response = await auth.signup(payload);

        if (response?.message.includes("successfully")) {
            setSuccess(true);

            //clear state and controlled inputs
            setUsername("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPwdMatch("");
            setErrorMsg("Successful registration. You will be redirected soon.");

            // redirect to homepage after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 3000)
        } else if (response?.message.includes("Email") || response?.message.includes("Username")) {
            setErrorMsg(response.message);
        } else {
            setErrorMsg("Registration failed");
        }
    }

    return (
        <div id="login-signup-container">
            <p className={(!errorMsg) ? "offscreen" : (success) ? "success-msg" : "error-msg"} aria-live="assertive">{errorMsg}</p>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username-field">
                        USERNAME
                    </label>
                    <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"}/>
                    <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"}/>
                </div>
                <input
                    type="text"
                    id="username-field"
                    autoComplete="on"
                    placeholder="Enter a username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="username-note"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                <p id="username-note"
                   className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/><br/>
                    3 to 20 characters.<br/>
                    First and last characters must be letter or number.<br/>
                    Lowercase and uppercase letters, numbers, underscores, hyphens and dots allowed.
                </p>

                <div>
                    <label htmlFor="first-name-field">FIRST NAME</label>
                </div>
                <input type="text"
                       value={firstName}
                       id="first-name-field"
                       placeholder="Enter your first name"
                       required
                       onChange={(e) => setFirstName(e.target.value)}
                />

                <div>
                    <label htmlFor="last-name-field">LAST NAME</label>
                </div>
                <input type="text"
                       value={lastName}
                       id="last-name-field"
                       placeholder="Enter your last name"
                       required
                       onChange={(e) => setLastName(e.target.value)}
                />

                <div>
                    <label htmlFor="email-field">
                        EMAIL
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"}/>
                    </label>
                </div>
                <input
                    type="email"
                    id="email-field"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="email-note"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="email-note" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/><br/>
                    Must be a valid email format: include an individual part, the at-sign and a domain name part.
                </p>

                <div>
                    <label htmlFor="password-field">
                        PASSWORD
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"}/>
                    </label>
                </div>
                <input
                    type="password"
                    id="password-field"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwd-note"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p id="pwd-note" className={passwordFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/><br/>
                    6 to 40 characters.<br/>
                    Password must contain at least one uppercase letter, one lowercase letter, one digit and one special
                    character.
                </p>

                <div>
                    <label htmlFor="confirm_pwd">
                        CONFIRM PASSWORD
                        <FontAwesomeIcon icon={faCheck} className={validMatch && pwdMatch ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !pwdMatch ? "hide" : "invalid"}/>
                    </label>
                </div>
                <input
                    type="password"
                    id="confirm_pwd"
                    placeholder="Enter password again"
                    onChange={(e) => setPwdMatch(e.target.value)}
                    value={pwdMatch}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirm-note"
                    onFocus={() => setPwdMatchFocus(true)}
                    onBlur={() => setPwdMatchFocus(false)}
                />
                <p id="confirm-note" className={pwdMatchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field.
                </p>

                <button disabled={!validUsername || !validPwd || !validMatch}>Sign up</button>
            </form>
        </div>
    );
}

export default SignupForm;
