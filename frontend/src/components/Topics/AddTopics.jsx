import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backgroundColorGenerator } from "@/data/randomColor";
import CrudLayout from "../Layouts/CrudLayout";
import { addCategory, setAdd } from "@/redux/slices/categorySlice";
import { categoryInitialValue, categorySchema } from "@/schema/CategorySchema";
import { addNewCategory } from "@/utils/categoryService";
import SharedForm from "./SharedForm";
const AddTopics = () => {
  const { toogleCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      style: {
        theme: backgroundColorGenerator(),
      },
    };
    const category = await addNewCategory(data);
    dispatch(addCategory(category));
    dispatch(setAdd(false));
  };
  return (
    toogleCategory && (
      <CrudLayout onClick={() => dispatch(setAdd(false))}>
        <div className="w-full h-full flex flex-col items-center">
          <div className="text-xl">Topic</div>
          <SharedForm
            initialValue={categoryInitialValue}
            handleSubmit={handleSubmit}
            validationSchema={categorySchema}
            type="Add"
          />
        </div>
      </CrudLayout>
    )
  );
};

export default AddTopics;
