import React from "react";
import CrudLayout from "../Layouts/CrudLayout";
import { categorySchema } from "@/schema/CategorySchema";
import SharedForm from "./SharedForm";
import {  updateCategory } from "@/utils/categoryService";
import { updateCategorySlice } from "@/redux/slices/categorySlice";
import { useDispatch } from "react-redux";

const UpdateCategories = ({setEditCategory, category}) => {
    const dispatch = useDispatch();
  const initialValue = {
    title: category.title,
    description: category.description,
  };
  const handleSubmit = async (values) => {
    const id = category._id;
    const updatedData = await updateCategory({id:id,data:values});
    if(updatedData){
        dispatch(updateCategorySlice(updatedData))
    }
    setEditCategory(false);
  };

  return (
    <CrudLayout onClick={() => setEditCategory(false)}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="text-xl">Edit Topic</div>
        <SharedForm
          initialValue={initialValue}
          validationSchema={categorySchema}
          handleSubmit={handleSubmit}
          type="Update"
        />
      </div>
    </CrudLayout>
  );
};

export default UpdateCategories;
