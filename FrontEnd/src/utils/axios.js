import axios from "axios";
import config from "../config";

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

// axiosInstance.interceptors.request.use((request) => {

//   return request;
// });
// axiosInstance.interceptors.response.use((response) => {
    
// })


export default axiosInstance;
