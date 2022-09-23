import {useState, createContext, useContext} from "react";
import {dataHandler} from "../data/DataHandler";
import { ACCESS_TOKEN } from '../constants/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadCurrentUser = () => {
        console.log("loading current user")
        dataHandler.getCurrentUser()
            .then(response => {
                setUser(response);
                console.log("You are successfully logged in.")
                console.log(user); //TODO: delete this
            }).catch(error => {
            console.log(`Could not load current user: ${error}`);
        });
    }

    const login = (payload) => {
        dataHandler.login(payload)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.token);
            });
        loadCurrentUser();
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