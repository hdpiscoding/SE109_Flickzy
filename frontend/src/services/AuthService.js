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