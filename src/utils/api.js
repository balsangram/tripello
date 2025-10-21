import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5002/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // ✅ Send cookies automatically
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
        // Get stored user data
        const stored = JSON.parse(localStorage.getItem("userData")) || {};
        const token = stored.accessToken;
        const userType = stored.user?.type || "user";

        const config = {
            url,
            method,
            data,
            params,
            headers: {
                "Content-Type": "application/json",
                ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
                ...(requireAuth ? { "x-user-type": userType } : {}),
                ...headers,
            },
        };

        const response = await api(config);
        return response.data;
    } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("⚠️ Unauthorized or expired session. Logging out...");
            localStorage.removeItem("userData");
            window.location.href = "/login";
        }

        // Return clean error message
        throw error.response?.data || { message: "Something went wrong!" };
    }
};
