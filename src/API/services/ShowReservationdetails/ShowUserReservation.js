import axiosInstance from "../../axiosInstance/AxiosInstance";

export const ShowUserReservation = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`admin/user/reservations/${id}`)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
