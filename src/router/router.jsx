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

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/rooms" element={<RoomDetail />} />
                    <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
                    <Route path="/MyBooking" element={<MyBooking />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Signup" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
