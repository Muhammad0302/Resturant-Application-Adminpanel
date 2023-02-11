import axiosInstance from "../../axiosInstance/AxiosInstance";

export const UpdateReservation = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`admin/reservation/`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
