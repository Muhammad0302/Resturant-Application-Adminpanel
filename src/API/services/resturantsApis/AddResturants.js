import axiosInstance from "../../axiosInstance/AxiosInstance";

export const Addresturants = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/admin/restaurant", data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
