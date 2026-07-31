import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ----------------------------
// Request Interceptor
// ----------------------------

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ----------------------------
// Response Interceptor
// ----------------------------

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem("refresh");

                // No refresh token available
                if (!refresh) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                // Request new access token
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/refresh/",
                    {
                        refresh: refresh,
                    }
                );

                const newAccess = response.data.access;

                // Save new access token
                localStorage.setItem("access", newAccess);

                // Update axios default header
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccess}`;

                // Update original request header
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token expired or invalid
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;