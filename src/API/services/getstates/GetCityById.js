import axiosInstance from "../../axiosInstance/AxiosInstance";

export const GetCityById = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/cities/all/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
