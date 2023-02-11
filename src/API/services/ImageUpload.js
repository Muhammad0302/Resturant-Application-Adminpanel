import axiosInstance from "../axiosInstance/AxiosInstance";

export const ImageUpload = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("image", data)
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
