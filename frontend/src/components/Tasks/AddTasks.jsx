import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskInitialValues, taskSchema } from "@/schema/TaskSchema";
import Shared from "./Shared";
import { addTasks } from "@/utils/tasksService";
import { addOneTask } from "@/redux/slices/tasksSlice";
import { useNavigate } from "react-router-dom";
const AddTasks = ({ categoryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      category: categoryId,
    };
    const tasks = await addTasks(data);
    dispatch(addOneTask(tasks));
    navigate(`/${categoryId}`);
  };
  return (
    <div className="h-full w-full md:w-[99%] m-auto mt-1 md:mt-[4.3rem] p-4 sm:p-2 bg-cardBg mb-8 border border-border">
      <div className="h-fit flex flex-col justify-center items-center gap-3">
        <h1 className="text-xl font-semibold">Add Task</h1>
        <Shared
          initialValues={taskInitialValues}
          validationSchema={taskSchema}
          handleSubmit={handleSubmit}
          type="Add"
        />
      </div>
    </div>
  );
};

export default AddTasks;
