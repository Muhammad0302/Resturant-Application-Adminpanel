import axiosInstance from "../../axiosInstance/AxiosInstance";

export const Sentmail = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("admin/resetpassword/", data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
