import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

// refreshToken() method is used to refresh the access token

const refreshToken = () => {
  const tokenResponse = axios.post(API_URL + "user/refresh-tokens", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  localStorage.setItem("accessToken", tokenResponse.data.accessToken);
  localStorage.setItem("refreshToken", tokenResponse.data.refreshToken);
};

export { refreshToken };
