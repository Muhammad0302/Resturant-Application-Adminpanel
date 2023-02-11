import axiosInstance from "../../axiosInstance/AxiosInstance";
export const GetReservation = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("admin/reservation/available")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
