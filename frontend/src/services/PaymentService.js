import axios from "../untils/axiosCustomize";
export const getLink = (amount, paymentinfo) => {
  return axios.post("/v1/payment/momo", {
    amount: amount,
    paymentinfo: paymentinfo,
  });
};
