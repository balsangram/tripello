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
import RoomDetail from "../pages/RoomDetail";

const AppRouter = () => {
    const { isLoggedIn } = useContext(AuthContext);
    console.log("🚀 ~ AppRouter ~ isLoggedIn:", isLoggedIn);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<Index />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Register />} />
                    <Route path="search" element={<Search />} />

                    {/* Protected Routes */}
                    <Route
                        path="room-detail"
                        element={
                            <ProtectedRoute> {/* 👈 Removed unused isLoggedIn prop */}
                                <RoomDetail />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;