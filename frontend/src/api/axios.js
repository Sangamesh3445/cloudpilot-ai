import axios from "axios";

// ============================
// Axios Instance
// ============================

const api = axios.create({
    baseURL: "/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ============================
// Request Interceptor
// ============================

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

// ============================
// Response Interceptor
// ============================

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

                if (!refresh) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                const response = await axios.post(
                    "/api/auth/refresh/",
                    {
                        refresh,
                    }
                );

                const newAccess = response.data.access;

                localStorage.setItem("access", newAccess);

                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccess}`;

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            } catch (refreshError) {

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