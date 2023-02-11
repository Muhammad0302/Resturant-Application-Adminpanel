import axiosInstance from "../../axiosInstance/AxiosInstance";

export const AddReservation = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`admin/reservation/`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
