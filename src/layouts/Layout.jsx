import React, { useContext } from "react"; // 👈 Added useContext
import { Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // 👈 Import context
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext); // 👈 Use context instead of local state/effect

    const handleLogout = () => {
        logout(); // 👈 Use context logout
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
            <main className="mt-8">
                {/* 👇 This renders the current page */}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;