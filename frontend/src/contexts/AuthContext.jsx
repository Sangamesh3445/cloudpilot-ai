import { createContext, useContext, useState } from "react";
import {
    login,
    logout,
    saveTokens,
    getAccessToken,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!getAccessToken()
    );

    const loginUser = async (username, password) => {
        const tokens = await login(username, password);

        saveTokens(tokens);

        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}