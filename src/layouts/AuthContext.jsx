import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessTokenUser = Cookies.get("accessToken_user");
        const accessTokenProvider = Cookies.get("accessToken_travelProvider");
        const loggedIn = !!accessTokenUser || !!accessTokenProvider;

        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const userData = JSON.parse(localStorage.getItem("user")) || null;
            setUser(userData);
        }
    }, []);

    const logout = () => {
        Cookies.remove("accessToken_user");
        Cookies.remove("refreshToken_user");
        Cookies.remove("accessToken_travelProvider");
        Cookies.remove("refreshToken_travelProvider");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
