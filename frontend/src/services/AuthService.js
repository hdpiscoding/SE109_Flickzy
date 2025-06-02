import axios from "axios";

export const login = async (email, password) => {
    const response = await axios.post("http://localhost:8386/api/v1/auth/login", {
        email,
        password,
    });
    return response.data;
}

export const register = async (email, password) => {
    const response = await axios.post("http://localhost:8386/api/v1/auth/register", {
        email,
        password,
    });
    return response.data;
}

export const forgotPassword = async (email) => {
    const response = await axios.post("http://localhost:8386/api/v1/auth/forgot-password", {
        email,
    });
    return response.data;
}

export const resetPassword = async (otp, email, newPassword) => {
    const response = await axios.post("http://localhost:8386/api/v1/auth/reset-password", {
        otp,
        email,
        newPassword,
    });
    return response.data;
}