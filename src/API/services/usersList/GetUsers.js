import axiosInstance from "../../axiosInstance/AxiosInstance";
export const GetUsers = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("admin/users/all")
      .then((res) => resolve(res).catch((err) => reject(err)));
  });
};
