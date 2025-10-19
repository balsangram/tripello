// src/router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';      // adjust path if needed

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Index from '../pages/Index';
import Search from "../pages/SearchPage";
import RoomDetail from '../pages/RoomDetail';
import ConfirmBooking from '../pages/ComfirmBooking';
import MyBooking from '../pages/MyBooking';
import ChatWithUs from '../pages/ChartWithUs';
import Profile from '../pages/Profile';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/roomsDetails" element={<RoomDetail />} />
                    <Route path="/confirmBooking" element={<ConfirmBooking />} />
                    <Route path="/myBooking" element={<MyBooking />} />
                    <Route path="/chatWithUs" element={<ChatWithUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
