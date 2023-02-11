import axiosInstance from "../../axiosInstance/AxiosInstance";

export const AddCities = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/admin/city", data)
      .then((res) => {
        resolve(res);
      })
      .catch((rej) => {
        reject(rej);
      });
  });
};
