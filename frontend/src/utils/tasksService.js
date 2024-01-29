import axiosCustom from "./axiosCustom";

export const addTasks = async (data) => {
  try {
    const response = await axiosCustom.post("/task/create", data);
    if ((response.data.status = true)) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByCategory = async (id) => {
  try {
    const response = await axiosCustom.get(`task/get-by-category/${id}`);
    if (response.statusText === "OK") {
      return response.data.tasks;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axiosCustom.get("/task/get-all");
    if (response.statusText === "OK") {
      return response.data.tasks;
    }
  } catch (error) {
    console.log(error);
  }
};
