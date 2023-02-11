import axios from "axios";
const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: `https://rezzlist.com/api/`,
  headers: {
    "Content-type": "application/json",
    token: token,
  },
});
export default axiosInstance;
