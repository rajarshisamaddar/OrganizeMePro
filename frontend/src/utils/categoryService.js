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

export const getCategory = async()=>{
    try {
        const response = await axiosCustom.get('/category/get-all-categories');
        if(response.data.status==="success"){
            return response.data.categories;
        }
    } catch (error) {
        console.log(error)
    }
}
