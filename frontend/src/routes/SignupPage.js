import {Link} from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import React from "react";

export const SignupPage = () => {
    return (
        <div className="login-container">
            <div className="login-header">
                <h1 className="login-title">Sign Up</h1>
            </div>
            <div className="login-content">
                <div className="login-form-container">
                    <SignupForm/>
                </div>
                <div className="register-link-container">
                    <p>Already registered?</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
