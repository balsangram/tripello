import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Index from "../pages/Index";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Search from "../pages/SearchPage";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../layouts/AuthContext";

const AppRouter = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<Index />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="search"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Search />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
