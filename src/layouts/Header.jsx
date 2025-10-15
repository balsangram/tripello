import React, { useState } from "react";
import { FiBell } from "react-icons/fi";  // ✅ React icon import
import logo from "../../public/logo.png";

function Header() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    return (
        <div className="w-full bg-red-600 flex items-center justify-between px-6 py-3 shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-10 object-contain"
                />
            </div>

            {/* Right: Notification & Profile */}
            <div className="flex items-center gap-6 relative">
                {/* Bell Icon */}
                <div
                    onClick={togglePopup}
                    className="text-2xl cursor-pointer text-white"
                >
                    <FiBell />
                </div>

                {/* Popup */}
                {showPopup && (
                    <div className="absolute right-10 top-10 bg-white shadow-lg rounded-md p-4 w-48 text-sm z-50">
                        <p className="border-b pb-2">No new messages</p>
                        <p className="pt-2 text-gray-500 text-center">Check later</p>
                    </div>
                )}

                {/* Profile Image */}
                <div>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover cursor-pointer border border-white"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
