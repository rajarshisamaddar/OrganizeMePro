import MarkDownEditor from "@/components/Tasks/MarkDownEditor";
import { getTask } from "@/utils/tasksService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { taskStatus } from "@/data/taskStatus";
import Loading from "@/components/Loading/Loading";
const Tasks = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const getTaskById = async () => {
    const data = await getTask(id);
    if (data) {
      setTask(data);
    }
  };
  useEffect(() => {
    getTaskById();
  }, [id]);
  if (!task) return <Loading />;
  const statusColor = taskStatus.find((item) => item.name === task.status);
  return (
    <div className="mt-1 md:mt-[4.8rem] sm:mt-[4.3rem] mb-8 transition-transition flex">
        <div className="w-full bg-cardBg border border-border p-3">
          <div className="p-2 rounded-md">
            <h1 className="w-full py-2 text-xl font-semibold capitalize">
              {task.title}
            </h1>

            <div className="flex items-center gap-1 justify-end">
              <p
                className="h-2 w-2 rounded-full mt-[-.1rem]"
                style={{ backgroundColor: statusColor.color }}
              ></p>
              <h1
                className="text-sm capitalize font-semibold"
                style={{ color: statusColor.color }}
              >
                {statusColor.name}
              </h1>
            </div>
            <MarkDownEditor markdown={task.description} />
          </div>
        </div>
    </div>
  );
};

export default Tasks;
