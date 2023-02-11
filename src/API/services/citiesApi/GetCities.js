import axiosInstance from "../../axiosInstance/AxiosInstance";

export const GetCities = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/cities/all/1`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
