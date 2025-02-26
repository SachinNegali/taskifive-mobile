import axios from "axios";
import { getUserToken } from "../helpers/secureStorage";

const axiosClient = axios.create({
  baseURL: "https://taskify-server-d4mb.onrender.com",
  // || "https://2435-36-255-235-60.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    console.log("this token", token);

    // const { token: authtoken } = useSelector((state: RootState) => state.auth);
    // console.log("kjfnkjdnkjndfkj", authtoken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
