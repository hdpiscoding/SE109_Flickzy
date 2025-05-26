import axios from "../untils/axiosCustomize";
export const LoginAPI = (body) => {
  return axios.post("v1/auth/login", body);
};
