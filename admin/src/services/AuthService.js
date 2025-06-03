import axios from "axios";

export const Login = async (email, password) => {
  const response = await axios.post("http://localhost:8386/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};
