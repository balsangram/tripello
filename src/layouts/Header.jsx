import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiChevronDown, FiLogOut, FiUser, FiHeart, FiMessageSquare, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProfilePlaceholder from "../assets/profile/profiel.png";
import logo from "/logo.png";

function Header({ isLoggedIn, onLogout, user }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const profileRef = useRef(null);

    const notifications = [
        { id: 1, title: "Booking Confirmed", message: "Your stay at Seaside Villa has been confirmed", time: "2 min ago", read: false },
        { id: 2, title: "Special Offer", message: "Get 20% off on your next booking", time: "1 hour ago", read: true },
        { id: 3, title: "Reminder", message: "Your trip to Goa starts in 3 days", time: "5 hours ago", read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        setShowNotifications(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' : 'bg-gradient-to-r from-[#cf1f46] to-[#e84d6d] shadow-lg'}`}>
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="Tripeloo" className="h-12 w-auto object-contain" />
                    {!isScrolled && <span className="text-white font-bold text-xl">Tripeloo</span>}
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            {/* Notifications */}
                            <div className="relative">
                                <button className="relative p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
                                    <FiBell className="text-xl" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium border-2 border-white">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Profile Menu */}
                            <div className="relative" ref={profileRef}>
                                <button onClick={toggleProfileMenu} className="flex items-center gap-2">
                                    <img
                                        src={user?.profilePicture || ProfilePlaceholder}
                                        alt={user?.fullName || "User"}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white"
                                    />
                                    <FiChevronDown className={`text-white ${showProfileMenu ? "rotate-180" : ""}`} />
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-lg w-56 p-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <h4 className="font-semibold text-gray-800">{user?.fullName}</h4>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>

                                        <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"><FiUser /> My Profile</Link>
                                        <Link to="/wishlist" className="block px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"><FiHeart /> Wishlist</Link>
                                        <Link to="/messages" className="block px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"><FiMessageSquare /> Messages</Link>
                                        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"><FiSettings /> Settings</Link>
                                        <button onClick={onLogout} className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 flex items-center gap-2">
                                            <FiLogOut /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="text-white font-medium hover:underline">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
