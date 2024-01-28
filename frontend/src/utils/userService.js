import axiosAuth from "./authUtils";
import axiosCustom from "./axiosCustom";

export const getUser = async () => {
    try {
      const response = await axiosCustom.get(
        "/user/me"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateUserDetails = async ({data, email}) => {
    try {
      const response = await axiosCustom.patch(`/user/me/${email}`, data);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };
  