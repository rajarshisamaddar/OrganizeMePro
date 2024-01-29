import React from "react";
import AddTasks from "@/components/Tasks/AddTasks";
import { useParams } from "react-router-dom";
const AddTaskPage = () => {
  const { id } = useParams();
  return (
    <div>
      <AddTasks categoryId={id} />
    </div>
  );
};

export default AddTaskPage;
