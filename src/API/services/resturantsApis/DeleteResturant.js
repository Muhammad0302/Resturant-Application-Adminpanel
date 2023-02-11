import axiosInstance from "../../axiosInstance/AxiosInstance";

export const DeleteResturant = (id) => {
  console.log("id", id);
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/admin/restaurant/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
