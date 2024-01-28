import axiosAuth from "./authUtils";
import axiosCustom from "./axiosCustom";
import axios from "axios";
export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8800/api/v1/user/login",
      data
    );
    const accessToken = response.data.tokens.accessToken;
    const refreshToken = response.data.tokens.refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const signupUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8800/api/v1/user/register",
      data
    );

    const accessToken = response.data.tokens.accessToken;
    const refreshToken = response.data.tokens.refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const response = await axiosAuth.get(
      "/user/me"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async ({data, email}) => {
  try {
    const response = await axiosAuth.patch(`/user/me/${email}`, data);
    
  } catch (error) {
    console.log(error)
  }
};

