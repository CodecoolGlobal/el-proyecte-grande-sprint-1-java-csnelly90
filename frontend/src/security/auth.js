import {useState, createContext, useContext} from "react";
import {dataHandler} from "../data/DataHandler";
import { ACCESS_TOKEN } from '../constants/constants';

const AuthContext = createContext({user: {}});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadCurrentUser = () => {
        console.log("loading current user")
        dataHandler.getCurrentUser()
            .then(response => {
                setUser({
                    "username": response.username,
                    "email": response.email,
                });
                console.log("You are successfully logged in.")
            }).catch(error => {
                console.log(`Could not load current user: ${error}`);
        });
    }

    const login = (payload) => {
        dataHandler.login(payload)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(response.token));
            })
            .then(() => loadCurrentUser());
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        console.log("You are successfully logged out.")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
