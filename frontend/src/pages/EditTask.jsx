import Loading from "@/components/Loading/Loading";
import Shared from "@/components/Tasks/Shared";
import { loaclDate } from "@/data/dateConverter";
import { setUpdatedTask } from "@/redux/slices/tasksSlice";
import { taskSchema } from "@/schema/TaskSchema";
import { getTask, updateTask } from "@/utils/tasksService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const dispatch = useDispatch();
  const getTaskById = async () => {
    const data = await getTask(id);
    if (data) setTask(data);
  };
  useEffect(() => {
    getTaskById();
  }, []);
  if (!task) return <Loading />;
  const initialValue = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate && loaclDate(task.dueDate),
  };
  const handleSubmit = async (values) => {
    const data = await updateTask({id:id, data:values});
    if(data){
        dispatch(setUpdatedTask(data));
        toast.success("Task edited successfully 🚀");
    }
    else{
        toast.error("Oops somthing went wrong ☹️");
    }
  };
  return (
    <div>
      <div className="h-full w-full md:w-[99%] m-auto mt-1 md:mt-[4.3rem] p-4 sm:p-2 bg-cardBg mb-8 border border-border">
        <div className="h-fit flex flex-col justify-center items-center gap-3">
          <h1 className="text-xl font-semibold">Edit Task</h1>
          <Shared
            initialValues={initialValue}
            validationSchema={taskSchema}
            handleSubmit={handleSubmit}
            type="Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTask;
