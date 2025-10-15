import React from "react";
import logo from "../../public/logo.png"; // update path if needed

function Footer() {
    return (
        <footer className="w-full bg-[#c5193a] text-white py-12 px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

                {/* Logo Section */}
                <div className="col-span-1 flex items-start">
                    <img src={logo} alt="Tripeloo Logo" className="w-32" />
                </div>

                {/* Getting Started */}
                <div>
                    <h3 className="font-semibold mb-3">GETTING STARTED</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Home</li>
                        <li>Stay Listings</li>
                        <li>Tour / Packages</li>
                        <li>Activities</li>
                    </ul>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="font-semibold mb-3">EXPLORE</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Account</li>
                        <li>Booking</li>
                        <li>Posts & Stories / My Feed</li>
                        <li>Profile</li>
                    </ul>
                </div>

                {/* Meet Tripeloo */}
                <div>
                    <h3 className="font-semibold mb-3">MEET TRIPELOO</h3>
                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Reviews</li>
                        <li>Terms & conditions</li>
                        <li>Privacy Policy</li>
                        <li>Copyright policy</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold mb-3">SUPPORT</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Muhammednt6@gmail.com</li>
                        <li>+91 7970067004</li>
                        <li>
                            NO. 58/1617 KOYAPPATHODY BUILDING,<br />
                            BEACH ROAD, KUTTICHIRA, Kozhikode,<br />
                            Kozhikode, Kerala, India-673001
                        </li>
                        <li>24*7 Assistance</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                {/* Business & Partners */}
                <div>
                    <h3 className="font-semibold mb-3">BUSINESS & PARTNERS</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Become Travel Provider</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
