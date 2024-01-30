import MarkDownEditor from "@/components/Tasks/MarkDownEditor";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { id } = useParams();
  const { allTasks } = useSelector((state) => state.tasks);
  const task = allTasks.find((task) => task._id === id);
  return (
    <div className="mt-1 md:mt-[4.8rem] sm:mt-[4.3rem] mb-8 transition-transition flex">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="w-full bg-cardBg p-5 border border-border text-2xl capitalize text-center">
          {task.title}
        </h1>
        <div className="w-full bg-cardBg mt-2 border-t border-border">
          <div className="p-2 px-4">
            <MarkDownEditor markdown={task.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
