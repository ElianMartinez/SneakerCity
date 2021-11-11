import axios from "axios";
import config from "../config";

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

axiosInstance.interceptors.request.use((request) => {
  console.log(request.method);

  return request;
});
// axiosInstance.interceptors.response.use((response) => {
//     // console.log(response);
//     return response;
// })


export default axiosInstance;
