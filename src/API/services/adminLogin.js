import axiosInstance from "../axiosInstance/AxiosInstance";

export const Adminlogin = (data) => {

  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/admin/login", data)
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

