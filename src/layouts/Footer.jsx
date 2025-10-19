// import React from "react";
// import logo from "../../public/logo.png"; // update path if needed

// function Footer() {
//     return (
//         <footer className="w-full bg-[#c5193a] text-white py-12 px-10">
//             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

//                 {/* Logo Section */}
//                 <div className="col-span-1 flex items-start">
//                     <img src={logo} alt="Tripeloo Logo" className="w-32" />
//                 </div>

//                 {/* Getting Started */}
//                 <div>
//                     <h3 className="font-semibold mb-3">GETTING STARTED</h3>
//                     <ul className="space-y-2 text-sm">
//                         <li>Home</li>
//                         <li>Stay Listings</li>
//                         <li>Tour / Packages</li>
//                         <li>Activities</li>
//                     </ul>
//                 </div>

//                 {/* Explore */}
//                 <div>
//                     <h3 className="font-semibold mb-3">EXPLORE</h3>
//                     <ul className="space-y-2 text-sm">
//                         <li>Account</li>
//                         <li>Booking</li>
//                         <li>Posts & Stories / My Feed</li>
//                         <li>Profile</li>
//                     </ul>
//                 </div>

//                 {/* Meet Tripeloo */}
//                 <div>
//                     <h3 className="font-semibold mb-3">MEET TRIPELOO</h3>
//                     <ul className="space-y-2 text-sm">
//                         <li>About Us</li>
//                         <li>Reviews</li>
//                         <li>Terms & conditions</li>
//                         <li>Privacy Policy</li>
//                         <li>Copyright policy</li>
//                     </ul>
//                 </div>

//                 {/* Support */}
//                 <div>
//                     <h3 className="font-semibold mb-3">SUPPORT</h3>
//                     <ul className="space-y-2 text-sm">
//                         <li>Muhammednt6@gmail.com</li>
//                         <li>+91 7970067004</li>
//                         <li>
//                             NO. 58/1617 KOYAPPATHODY BUILDING,<br />
//                             BEACH ROAD, KUTTICHIRA, Kozhikode,<br />
//                             Kozhikode, Kerala, India-673001
//                         </li>
//                         <li>24*7 Assistance</li>
//                         <li>FAQ</li>
//                     </ul>
//                 </div>

//                 {/* Business & Partners */}
//                 <div>
//                     <h3 className="font-semibold mb-3">BUSINESS & PARTNERS</h3>
//                     <ul className="space-y-2 text-sm">
//                         <li>Become Travel Provider</li>
//                     </ul>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default Footer;


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
    FaClock,
    FaQuestionCircle,
    FaArrowRight,
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
            title: "GETTING STARTED",
            links: ["Home", "Stay Listings", "Tour / Packages", "Activities"]
        },
        {
            title: "EXPLORE",
            links: ["Account", "Booking", "Posts & Stories / My Feed", "Profile"]
        },
        {
            title: "MEET TRIPELOO",
            links: ["About Us", "Reviews", "Terms & conditions", "Privacy Policy", "Copyright policy"]
        },
        {
            title: "BUSINESS & PARTNERS",
            links: ["Become Travel Provider", "Partner Login", "Affiliate Program", "API Documentation"]
        }
    ];

    return (
        <footer className="relative w-full bg-gradient-to-br from-[#c5193a] to-[#e84d6d] text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-start mb-6 transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={logo}
                                alt="Tripeloo Logo"
                                className="w-40 filter brightness-0 invert"
                            />
                        </div>
                        <p className="text-white/80 mb-6 leading-relaxed max-w-md">
                            Your trusted travel companion for unforgettable experiences. Book accommodation,
                            resort villas, hotels, and discover amazing tours and activities worldwide.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mb-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-white/20 border border-white/20 ${social.color}`}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <FiMail className="w-4 h-4" />
                                Stay Updated
                            </h4>
                            {isSubscribed ? (
                                <div className="text-green-300 text-sm font-medium bg-white/10 rounded-xl p-3 text-center animate-pulse">
                                    ✅ Thank you for subscribing!
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-white/60 text-white"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-[#c5193a] py-3 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        Subscribe
                                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                                <h3 className="font-bold text-white mb-4 text-lg border-l-4 border-white/30 pl-3">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href="#"
                                                className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm lg:text-base"
                                            >
                                                <div className="w-1 h-1 bg-white/50 rounded-full group-hover:bg-white transition-colors"></div>
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                    <h3 className="font-bold text-xl mb-6 text-center">SUPPORT & CONTACT</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-4 group cursor-pointer transform hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <FaEnvelope className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </div>
                            <div>
                                <div className="text-white/70 text-sm">Email</div>
                                <div className="font-semibold text-white">Muhammednt6@gmail.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer transform hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <FaPhone className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </div>
                            <div>
                                <div className="text-white/70 text-sm">Phone</div>
                                <div className="font-semibold text-white">+91 7970067004</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer transform hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <FaMapMarkerAlt className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </div>
                            <div>
                                <div className="text-white/70 text-sm">Address</div>
                                <div className="font-semibold text-white text-sm">Kozhikode, Kerala</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer transform hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <FaClock className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </div>
                            <div>
                                <div className="text-white/70 text-sm">Support</div>
                                <div className="font-semibold text-white">24*7 Assistance</div>
                            </div>
                        </div>
                    </div>

                    {/* Full Address */}
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-start gap-3">
                            <FiMapPin className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                            <div className="text-white/80 text-sm leading-relaxed">
                                NO. 58/1617 KOYAPPATHODY BUILDING, BEACH ROAD, KUTTICHIRA,
                                Kozhikode, Kozhikode, Kerala, India-673001
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="text-white/70 text-sm text-center lg:text-left">
                            © {new Date().getFullYear()} Tripeloo. All rights reserved.
                            Made with <FaHeart className="w-3 h-3 text-red-300 inline mx-1" />
                            for travelers worldwide.
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                            <a href="#" className="hover:text-white transition-colors">Terms & conditions</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                                <FaQuestionCircle className="w-3 h-3" />
                                FAQ
                            </a>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-3">
                            <div className="text-white/70 text-sm mr-2">We accept:</div>
                            <div className="flex gap-2">
                                {["💳", "📱", "🏦", "🔒"].map((method, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
        </footer>
    );
}

export default Footer;