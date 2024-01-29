import AddTasks from "@/components/Tasks/AddTasks";
import { toogleAdd } from "@/redux/slices/tasksSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const category = categories && categories.find((item) => item._id === id);
  return (
    <div className="mt-3 md:mt-20">
      <div>
        <h1>{category.title}</h1>
        <button className="mt-4 p-2 rounded-md border border-boreder" onClick={()=>dispatch(toogleAdd(true))}>
          Add Task
        </button>
        <AddTasks />
      </div>
    </div>
  );
};

export default Category;
