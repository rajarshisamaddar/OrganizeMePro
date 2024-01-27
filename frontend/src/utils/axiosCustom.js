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
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
    req.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }

  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const isExpired = decodedToken
    ? dayjs.unix(decodedToken.exp).diff(dayjs()) < 1
    : false;
  if (!isExpired) return req;

  if (!refreshPromise) {
    const refreshToken = localStorage.getItem("refreshToken");
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

  const newAccessToken = await refreshPromise;
  accessToken = newAccessToken; // Update the accessToken variable

  req.headers.Authorization = `Bearer ${newAccessToken}`;

  return req;
});

export default axiosCustom;
