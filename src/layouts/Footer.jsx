import React, { useState } from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHeart
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import logo from "../../public/logo.png";

function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const socialLinks = [
        { icon: FaFacebookF, href: "#", color: "hover:text-blue-500" },
        { icon: FaTwitter, href: "#", color: "hover:text-sky-400" },
        { icon: FaInstagram, href: "#", color: "hover:text-pink-500" },
        { icon: FaLinkedinIn, href: "#", color: "hover:text-blue-600" },
        { icon: FaYoutube, href: "#", color: "hover:text-red-500" }
    ];

    const footerSections = [
        {
            title: "QUICK LINKS",
            links: ["Home", "Stay Listings", "Tour Packages", "Activities", "About Us"]
        },
        {
            title: "SUPPORT",
            links: ["Help Center", "Contact Us", "Privacy Policy", "Terms & Conditions", "FAQ"]
        }
    ];

    return (
        <footer className="relative w-full bg-gradient-to-br from-[#c5193a] to-[#e84d6d] text-white overflow-hidden" style={{ height: '30vh', minHeight: '300px' }}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full py-6">
                    {/* Brand Section - Left */}
                    <div className="lg:col-span-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start mb-3">
                                <img
                                    src={logo}
                                    alt="Tripeloo Logo"
                                    className="w-32 filter brightness-0 invert"
                                />
                            </div>
                            <p
                                className="text-white/80 text-sm leading-relaxed mb-3"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                Your trusted travel companion for unforgettable experiences worldwide.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-2 mb-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-white/20 border border-white/20 ${social.color}`}
                                >
                                    <social.icon className="w-3 h-3" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections - Middle */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-white mb-3 text-sm border-l-2 border-white/30 pl-2">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href="#"
                                                className="text-white/70 hover:text-white transition-all duration-200 flex items-center gap-1 group text-xs"
                                            >
                                                <div className="w-1 h-1 bg-white/50 rounded-full group-hover:bg-white transition-colors flex-shrink-0"></div>
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact & Newsletter - Right */}
                    <div className="lg:col-span-1 flex flex-col justify-between">
                        {/* Contact Info */}
                        <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <FiPhone className="w-3 h-3" />
                                <span>+91 7970067004</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <FiMail className="w-3 h-3" />
                                <span>Muhammednt6@gmail.com</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-white/80">
                                <FiMapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span className="leading-tight">Kozhikode, Kerala, India</span>
                            </div>
                        </div>

                        {/* Compact Newsletter */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                            <h4 className="font-semibold mb-2 flex items-center gap-1 text-xs">
                                <FiMail className="w-3 h-3" />
                                Newsletter
                            </h4>
                            {isSubscribed ? (
                                <div className="text-green-300 text-xs font-medium bg-white/10 rounded-lg p-2 text-center">
                                    ✅ Subscribed!
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-transparent placeholder-white/60 text-white text-xs"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-[#c5193a] py-2 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 text-xs"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
                        <div className="text-center sm:text-left">
                            © {new Date().getFullYear()} Tripeloo. All rights reserved.
                            Made with <FaHeart className="w-3 h-3 text-red-300 inline mx-1" />
                            for travelers.
                        </div>

                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-white transition-colors text-xs">Terms</a>
                            <a href="#" className="hover:text-white transition-colors text-xs">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors text-xs">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;