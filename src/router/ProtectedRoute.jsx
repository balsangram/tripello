import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../layouts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    console.log("🚀 ~ ProtectedRoute ~ isLoggedIn:", isLoggedIn); // 👈 Add for debugging

    // Wait for initial check
    if (isLoggedIn === null) {
        return <div>Loading...</div>; // 👈 Or a spinner component
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;