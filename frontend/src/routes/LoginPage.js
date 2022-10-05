import {Link} from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import '../login.css';

export const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-header">
                <h1 className="login-title">Login</h1>
            </div>
            <div className="login-content">
                <div className="login-form-container">
                    <LoginForm/>
                </div>
                <div className="register-link-container">
                    <span>OR</span>
                    <Link to="/signup">Register now!</Link>
                </div>
            </div>
        </div>
    );
}
