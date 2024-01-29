import React from "react";
import CrudLayout from "../Layouts/CrudLayout";
import { categorySchema } from "@/schema/CategorySchema";
import SharedForm from "./SharedForm";
import { updateCategory } from "@/utils/categoryService";
import { updateCategorySlice } from "@/redux/slices/categorySlice";
import { useDispatch } from "react-redux";
import { isDarkColor } from "@/data/randomColor";
import { getAcronym } from "@/data/getAcronym";

const UpdateTopics = ({ setEditCategory, category }) => {
  const dispatch = useDispatch();
  const initialValue = {
    title: category.title,
    description: category.description,
  };
  const handleSubmit = async (values) => {
    const id = category._id;
    const updatedData = await updateCategory({ id: id, data: values });
    if (updatedData) {
      dispatch(updateCategorySlice(updatedData));
    }
    setEditCategory(false);
  };

  return (
    <CrudLayout onClick={() => setEditCategory(false)}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div
          className={`flex text-base font-bold justify-center items-center h-[3rem] w-[3rem] rounded-full border border-border ${
            isDarkColor(category.style.theme) === true
              ? "text-white"
              : "text-black"
          }`}
          style={{ backgroundColor: category.style.theme }}
        >
          {getAcronym(category.title)}
        </div>
        <div className="text-lg font-semibold">Edit Topic</div>
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

export default UpdateTopics;
