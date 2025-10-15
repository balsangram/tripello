import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        // Add your login logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Email address</label>
                        <input
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Enter Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                </form>

                {/* Footer Links */}
                <p className="text-center text-gray-600 mt-4 text-sm">
                    New user?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
