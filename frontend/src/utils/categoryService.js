import axiosCustom from "./axiosCustom";

export const addNewCategory = async (data) => {
  try {
    const response = await axiosCustom.post("/category/create", data);
    if (response.data.status === "success") {
      return response.data.category;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await axiosCustom.get("/category/get-all-categories");
    if (response.data.status === "success") {
      return response.data.categories;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCollaborators = async (data) => {
  try {
    const response = await axiosCustom.post("/category/add-collaborator", data);
    if (response.statusText === "OK") {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async ({ data, id }) => {
  try {
    const response = await axiosCustom.patch(`/category/update/${id}`, data);
    if(response.statusText==='OK'){
      return response.data.category;
    }
  } catch (error) {
    console.log(error);
  }
};
