import {Link} from "react-router-dom";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-header">
                <h1 className="login-title">Login</h1>
                <p className="login-sub-title">Please enter you Login and your Password</p>
            </div>
            <div className="login-content">
                <LoginForm />
                <span>OR</span>
                <Link to="signup">Register now!</Link>
            </div>
        </div>
    );
}