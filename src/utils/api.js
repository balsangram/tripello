import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";

// ✅ Axios instance that always includes cookies
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // crucial for sending cookies automatically
});

// ✅ Main reusable API handler
export const apiHandler = async ({
    url,
    method = "GET",
    data = {},
    params = {},
    headers = {},
    requireAuth = true,
}) => {
    try {
        // ✅ Optional: detect user type from cookies (fallback to localStorage)
        let userType = "user";
        const stored = JSON.parse(localStorage.getItem("userData")) || {};
        if (stored.user?.type) userType = stored.user.type;

        const config = {
            url,
            method,
            data,
            params,
            headers: {
                "Content-Type":
                    data instanceof FormData ? "multipart/form-data" : "application/json",
                ...(requireAuth ? { "x-user-type": userType } : {}), // tell backend what kind of user
                ...headers,
            },
        };

        const response = await api(config);
        return response.data;
    } catch (error) {
        const status = error.response?.status;

        // ✅ Handle network/CORS errors (no response object)
        if (!error.response) {
            console.error("Network or CORS error:", error.message);
            throw { message: "Network error. Please check your connection or server CORS settings." };
        }

        if (status === 401) {
            console.warn("⚠️ Unauthorized or expired session. Logging out...");
            localStorage.removeItem("userData");
            window.location.href = "/login";
            return; // Exit early after redirect
        }

        throw error.response?.data || { message: `Server error: ${status || 'Unknown'}` };
    }
};