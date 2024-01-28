import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getNewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const response = await axios.post(
        "http://localhost:8800/api/v1/user/refresh-tokens",
        { refreshToken: refreshToken }
      );

      if (response.status === 200) {
        const accessToken = response.data.tokens.accessToken;
        const refreshToken = response.data.tokens.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return { accessToken: accessToken, refreshToken: refreshToken };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosAuth = axios.create({
  baseURL: BASE_URL,
});
axiosAuth.interceptors.request.use(
  async (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      let currentDate = new Date();
      const decodeToken = jwtDecode(accessToken);
      if (decodeToken.exp * 1000 < currentDate.getTime()) {
        const tokens = await getNewAccessToken();
        console.log(tokens);
        req.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
