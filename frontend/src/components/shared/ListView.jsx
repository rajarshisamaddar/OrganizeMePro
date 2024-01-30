import React, { useState } from "react";
import MarkDownEditor from "../Tasks/MarkDownEditor";
import { useDispatch } from "react-redux";
import { updateTask } from "@/utils/tasksService";
import { setUpdatedTask } from "@/redux/slices/tasksSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEditDocument } from "react-icons/md";

const ListView = ({ allTasks, currentStatus }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const handleTaskStatus = async (taskId, newStatus) => {
    setStatus((prev) => ({
      ...prev,
      [taskId]: newStatus,
    }));

    const changeStatus = await updateTask({
      id: taskId,
      data: { status: newStatus },
    });
    if (changeStatus) {
      dispatch(setUpdatedTask(changeStatus));
      toast.success(`task is ${newStatus}`);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 mt-4 px-8 sm:px-3">
      {allTasks &&
        allTasks.map(
          (task) =>
            task.status === currentStatus && (
              <div
                key={task._id}
                className="h-[18rem] flex flex-col justify-between w-auto cursor-pointer bg-cardBg border border-border p-3 rounded-md overflow-hidden"
              >
                <div className="flex w-full justify-between items-center">
                  <select
                    name=""
                    id=""
                    className="w-[100px] bg-background p-1 rounded-md text-sm border border-border capitalize"
                    value={status[task._id] || task.status}
                    onChange={(e) => handleTaskStatus(task._id, e.target.value)}
                  >
                    {["pending", "ongoing", "completed", "archived"].map(
                      (statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      )
                    )}
                  </select>
                  <div className="flex items-center gap-3 text-xl">
                    <div
                      className="text-green-600"
                      onClick={() => navigate(`/editTask/${task._id}`)}
                    >
                      <MdEditDocument />
                    </div>
                    <div className="text-red-600">
                      <MdDelete />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate(`/viewTask/${task._id}`)}
                  className="mt-3 overflow-hidden border-t border-border flex-1 bg-background rounded-md"
                >
                  <div className="p-2  border-b border-border">
                    <p className="capitalize font-semibold text-sm">
                      {task.title}
                    </p>
                  </div>
                  <div className="h-full p-2 rounded-md">
                    <MarkDownEditor
                      markdown={
                        task.description.length > 60
                          ? task.description.slice(0, 60)
                          : task.description
                      }
                    />
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default ListView;
