
import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiChevronDown, FiSearch, FiMessageSquare, FiSettings, FiLogOut, FiUser, FiHeart } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import Profile from "../assets/profile/profiel.png";
import logo from "/logo.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showTravelersMenu, setShowTravelersMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const travelersRef = useRef(null);
    const location = useLocation();

    const notifications = [
        {
            id: 1,
            title: "Booking Confirmed",
            message: "Your stay at Seaside Villa has been confirmed",
            time: "2 min ago",
            read: false,
            type: "success"
        },
        {
            id: 2,
            title: "Special Offer",
            message: "Get 20% off on your next booking",
            time: "1 hour ago",
            read: true,
            type: "promo"
        },
        {
            id: 3,
            title: "Reminder",
            message: "Your trip to Goa starts in 3 days",
            time: "5 hours ago",
            read: true,
            type: "reminder"
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (travelersRef.current && !travelersRef.current.contains(event.target)) {
                setShowTravelersMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        setShowProfileMenu(false);
        setShowTravelersMenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        setShowNotifications(false);
        setShowTravelersMenu(false);
    };

    const toggleTravelersMenu = () => {
        setShowTravelersMenu(!showTravelersMenu);
        setShowNotifications(false);
        setShowProfileMenu(false);
    };

    const handleNotificationClick = (id) => {
        // Mark as read logic here
        console.log(`Notification ${id} clicked`);
    };

    const travelerTypes = [
        { id: 1, name: "Solo Traveler", icon: "👤", description: "Traveling alone" },
        { id: 2, name: "Couples", icon: "💑", description: "Romantic getaways" },
        { id: 3, name: "Family", icon: "👨‍👩‍👧‍👦", description: "Family vacations" },
        { id: 4, name: "Business", icon: "💼", description: "Business trips" },
        { id: 5, name: "Group", icon: "👥", description: "Group travels" },
        { id: 6, name: "Adventure", icon: "🧗", description: "Adventure seekers" }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100'
            : 'bg-gradient-to-r from-[#cf1f46] to-[#e84d6d] shadow-lg'
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo + Navigation */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <img
                                    src={logo}
                                    alt="Tripeloo"
                                    className="h-12 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute -inset-2 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            {!isScrolled && (
                                <span className="text-white font-bold text-xl tracking-tight">Tripeloo</span>
                            )}
                        </Link>

                        {/* Divider */}
                        {!isScrolled && (
                            <div className="h-8 w-[1px] bg-white/30"></div>
                        )}

                        {/* Travelers Dropdown */}
                        <div className="relative" ref={travelersRef}>
                            <button
                                onClick={toggleTravelersMenu}
                                className={`flex items-center gap-2 font-medium transition-all duration-300 group ${isScrolled
                                    ? 'text-gray-700 hover:text-[#cf1f46]'
                                    : 'text-white hover:text-white/90'
                                    }`}
                            >
                                <MdTravelExplore className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
                                <span>Travelers</span>
                                <FiChevronDown className={`text-lg opacity-80 transition-transform duration-300 ${showTravelersMenu ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {/* Travelers Dropdown Menu */}
                            {showTravelersMenu && (
                                <div className="absolute top-12 left-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-4 w-64 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <h3 className="font-semibold text-gray-800 mb-3 px-2">Traveler Types</h3>
                                    <div className="space-y-2">
                                        {travelerTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                                            >
                                                <span className="text-2xl">{type.icon}</span>
                                                <div className="text-left flex-1">
                                                    <div className="font-medium text-gray-800 group-hover:text-[#cf1f46] transition-colors">
                                                        {type.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {type.description}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search Bar - Visible when scrolled */}
                    {isScrolled && (
                        <div className="flex-1 max-w-md mx-8">
                            <div className="relative group">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#cf1f46] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search destinations, hotels, experiences..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#cf1f46] focus:bg-white focus:border-[#cf1f46] transition-all duration-300 group-hover:bg-gray-50"
                                />
                            </div>
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={toggleNotifications}
                                className={`relative p-2 rounded-xl transition-all duration-300 group ${isScrolled
                                    ? 'text-gray-600 hover:text-[#cf1f46] hover:bg-gray-100'
                                    : 'text-white hover:bg-white/20'
                                    } ${showNotifications ? (isScrolled ? 'bg-gray-100 text-[#cf1f46]' : 'bg-white/30') : ''}`}
                                aria-label="Notifications"
                            >
                                <FiBell className="text-xl group-hover:scale-110 transition-transform" />

                                {/* Notification Badge */}
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium border-2 border-white animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Popup */}
                            {showNotifications && (
                                <div className="absolute right-0 top-14 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-4 w-80 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                                        <span className="text-xs text-[#cf1f46] font-medium">
                                            {unreadCount} unread
                                        </span>
                                    </div>

                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification.id)}
                                                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group ${notification.read
                                                    ? 'bg-gray-50 hover:bg-gray-100'
                                                    : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-400' : 'bg-blue-500 animate-pulse'
                                                        }`}></div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-gray-800 group-hover:text-[#cf1f46] transition-colors">
                                                                {notification.title}
                                                            </h4>
                                                            <span className="text-xs text-gray-500">
                                                                {notification.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <button className="w-full text-center text-sm text-[#cf1f46] font-medium hover:text-[#b51c3d] transition-colors py-2">
                                            View All Notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Menu */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={toggleProfileMenu}
                                className="flex items-center gap-2 group"
                            >
                                <div className="relative">
                                    <img
                                        src={Profile}
                                        alt="User Profile"
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#cf1f46] to-[#e84d6d] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                                </div>
                                {!isScrolled && (
                                    <FiChevronDown className={`text-white transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''
                                        }`} />
                                )}
                            </button>

                            {/* Profile Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 top-14 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-2 w-56 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={Profile}
                                                alt="User"
                                                className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                                <p className="text-sm text-gray-500">john@example.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 p-2">
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 hover:text-[#cf1f46]"
                                        >
                                            <FiUser className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            to="/wishlist"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 hover:text-[#cf1f46]"
                                        >
                                            <FiHeart className="w-4 h-4" />
                                            <span>Wishlist</span>
                                        </Link>
                                        <Link
                                            to="/messages"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 hover:text-[#cf1f46]"
                                        >
                                            <FiMessageSquare className="w-4 h-4" />
                                            <span>Messages</span>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 hover:text-[#cf1f46]"
                                        >
                                            <FiSettings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </div>

                                    <div className="p-2 border-t border-gray-100">
                                        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-all duration-200 text-red-600 hover:text-red-700">
                                            <FiLogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;