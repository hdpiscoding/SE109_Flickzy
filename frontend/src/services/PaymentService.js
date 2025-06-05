import axios from "../untils/axiosCustomize";
export const getLink = (
  amount,
  paymentinfo,
  seats,
  snacks,
  scheduleID,
  userId
) => {
  return axios.post("/v1/payment/momo", {
    amount: amount,
    paymentinfo: paymentinfo,
    extraData: {
      userId: userId,
      scheduleId: scheduleID,
      momoID: "aaaaaaaaaaaa",
      seats: seats,
      snacks: snacks,
    },
  });
};
export const checkPayment = (momoid) => {
  return axios.post("/v1/payment/check", {
    orderId: momoid,
  });
};
export const updateEmail = (momoid, email) => {
  return axios.put(
    "/v1/booking/update-email-by-momo?momoId=" + momoid + "&email=" + email
  );
};
