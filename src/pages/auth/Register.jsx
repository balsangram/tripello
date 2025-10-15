import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your registration logic here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-[30rem] p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Signup</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Your Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Email address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#CF1F46] text-white font-semibold py-3 rounded-full hover:bg-[#c50f36] transition"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-gray-900 underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
