

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHandler } from "../../utils/api"; // adjust if your api.js is in another folder

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Call login API
      const res = await apiHandler({
        url: "/users/login",
        method: "POST",
        data: { email, password },
        requireAuth: false, // login doesn't need token
      });

      // ✅ Store user data and token in localStorage
      localStorage.setItem("userData", JSON.stringify(res));

      // ✅ Reload and redirect to dashboard or home
      window.location.href = "/";
    } catch (error) {
      alert(error?.message || "Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[30rem] p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF1F46] transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#CF1F46] text-white font-semibold py-3 rounded-full hover:bg-[#c50f36] transition"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          New user?{" "}
          <Link to="/signup" className="font-medium text-gray-900 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;