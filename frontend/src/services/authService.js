import api from "../api/axios";

export const login = async (username, password) => {
    const response = await api.post("/auth/login/", {
        username,
        password,
    });

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

export const saveTokens = (tokens) => {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
};

export const getAccessToken = () => {
    return localStorage.getItem("access");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refresh");
};