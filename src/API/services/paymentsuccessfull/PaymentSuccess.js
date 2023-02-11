import axiosInstance from "../../axiosInstance/AxiosInstance";

export const PaymentSuccess = (sessionId, Reservationid, userID) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(
        `user/success/checkout/?session_id=${sessionId}&userId=${userID}&reservationId=${Reservationid}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((rej) => {
        reject(rej);
      });
  });
};
