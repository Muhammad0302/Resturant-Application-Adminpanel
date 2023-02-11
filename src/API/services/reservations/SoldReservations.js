import axiosInstance from "../../axiosInstance/AxiosInstance";
export const SoldReservations = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("admin/reservation/sold")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
