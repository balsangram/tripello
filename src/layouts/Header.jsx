import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import Profile from "../assets/profile/profiel.png";
import logo from "/logo.png"; // Adjust path if needed

function Header() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    return (
        <header className="w-full bg-[#cf1f46] flex items-center justify-between px-8 py-3 shadow-md">
            {/* Logo + Travelers */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                <div className="h-8 w-[1px] bg-white opacity-30"></div>

                <div className="flex items-center gap-1 cursor-pointer text-white font-medium">
                    <span>Travelers</span>
                    <FiChevronDown className="text-lg opacity-80" />
                </div>
            </div>

            {/* Notification + Profile */}
            <div className="flex items-center gap-6 relative">
                {/* Notification Button */}
                <div className="relative">
                    <button
                        onClick={togglePopup}
                        className="text-xl text-white p-2 rounded-full hover:bg-[#b51c3d] transition-colors"
                        aria-label="Notifications"
                    >
                        <FiBell />
                    </button>
                    {/* Blue dot */}
                    <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>

                    {/* Popup */}
                    {showPopup && (
                        <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 w-52 text-sm z-50 border">
                            <h3 className="font-semibold text-gray-800 border-b pb-2">
                                Notifications
                            </h3>
                            <p className="py-3 text-gray-600 text-center">
                                No new messages
                            </p>
                            <p className="text-gray-500 text-xs text-center border-t pt-2">
                                Check back later for updates
                            </p>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <img
                    src={Profile}
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover border-2 border-white cursor-pointer"
                />
            </div>
        </header>
    );
}

export default Header;
