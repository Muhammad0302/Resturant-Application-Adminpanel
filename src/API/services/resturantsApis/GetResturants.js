import axiosInstance from "../../axiosInstance/AxiosInstance";

export const GetResturants = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/restaurants/all")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
