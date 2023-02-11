import axiosInstance from "../../axiosInstance/AxiosInstance";

export const Contact = (data) => {

  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/contactus", data)
      .then((res) => {
        resolve(res);
      })
      .catch((rej) => {
        reject(rej);
      });
  });
};
