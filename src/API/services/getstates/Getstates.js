import axiosInstance from "../../axiosInstance/AxiosInstance";

export const GetStates = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/states")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
