import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

let accessToken = localStorage.getItem("accessToken");

const axiosCustom = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

let refreshPromise = null;

axiosCustom.interceptors.request.use(async (req) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const decodedToken = jwtDecode(accessToken);
  const isExpiringSoon = dayjs().add(10, "second").unix() > decodedToken.exp;

  if (!refreshPromise && isExpiringSoon) {
    refreshPromise = axios
      .post(`${BASE_URL}/user/refresh-tokens`, {
        refreshToken: refreshToken,
      })
      .then(
        ({
          data: {
            tokens: { accessToken, refreshToken },
          },
        }) => {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          return accessToken;
        }
      )
      .finally(() => {
        refreshPromise = null;
      });
  }

  if (refreshPromise) {
    const newAccessToken = await refreshPromise;
    accessToken = newAccessToken; // Update the accessToken variable
    req.headers.Authorization = `Bearer ${newAccessToken}`;
  }

  return req;
});

export default axiosCustom;
