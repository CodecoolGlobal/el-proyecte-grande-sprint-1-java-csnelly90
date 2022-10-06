import {useState, createContext, useContext, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {dataHandler} from "../data/DataHandler";
import {ACCESS_TOKEN} from '../constants/constants';

const AuthContext = createContext({user: {}});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // check the state of authentication and set user if authenticated
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setUser(null);
            return;
        }

        if (isJwtExpired(token)) {
            console.log('JWT Expired');
            logout();
            return;
        }

        const controller = new AbortController();

        dataHandler.getCurrentUser()
            .then((user) => {
                setUser({
                    "username": user.username,
                    "email": user.email,
                    "roles": user.authorities[0].authority
                });
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            controller.abort();
        };
    }, []);

    const loadCurrentUser = () => {
        dataHandler.getCurrentUser()
            .then((user) => {
                setUser({
                    "username": user.username,
                    "email": user.email,
                    "roles": user.authorities[0].authority
                });
            }).catch(error => {
            console.log(`Could not load current user: ${error}`);
        });
    }

    const signup = async (payload) => {
        return await dataHandler.signup(payload);
    }

    const login = (payload) => {
        dataHandler.login(payload)
            .then(response => {
                    if (response.token) {
                        localStorage.setItem(ACCESS_TOKEN, JSON.stringify(response.token));
                        loadCurrentUser();
                    }
                }
            );
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
    }

    const isJwtExpired = (tokenFromLocalStorage) => {
        const decodedToken = jwt_decode(tokenFromLocalStorage);
        const dateNow = new Date();
        return decodedToken.exp < dateNow / 1000;
    };

    return (
        <AuthContext.Provider value={{user, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
