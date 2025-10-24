import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // 👈 Changed to null for loading state
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessTokenUser = Cookies.get("accessToken_user");
        console.log("🚀 ~ AuthProvider ~ accessTokenUser:", accessTokenUser);
        const accessTokenProvider = Cookies.get("accessToken_travelProvider");
        console.log("🚀 ~ AuthProvider ~ accessTokenProvider:", accessTokenProvider);
        const loggedIn = !!accessTokenUser || !!accessTokenProvider;
        console.log("🚀 ~ AuthProvider ~ loggedIn:", loggedIn);

        setIsLoggedIn(loggedIn); // 👈 Now sets after check

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