// src/router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';      // adjust path if needed
import Home from '../pages/Home';   // keep your existing path
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Signup" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
