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
    window.location.href('/');
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

