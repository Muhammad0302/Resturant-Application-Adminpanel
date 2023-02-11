import axiosInstance from "../../axiosInstance/AxiosInstance";

export const DeleteCity = (id) => {
  console.log("id", id);
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/admin/city/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
