import React, { useState } from "react";
import MarkDownEditor from "../Tasks/MarkDownEditor";
import { MdEditDocument } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUpdatedTask } from "@/redux/slices/tasksSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { updateTask } from "@/utils/tasksService";
import toast from "react-hot-toast";
import { LuPlusCircle } from "react-icons/lu";
import { getAcronym } from "@/data/getAcronym";
const GridView = ({ allTasks, currentStatus, hasMember, category }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const [openAssign, setOpenAssign] = useState({});
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

  const handleTaskAssign = (taskId) => {
    setOpenAssign((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleAssign = async (taskId, member) => {
    const assigned = await updateTask({
      id: taskId,
      data: { assignedTo: member },
    });
    if (assigned) {
      dispatch(setUpdatedTask(assigned));
      toast.success(`Assigned to ${member}`);
      handleTaskAssign(taskId);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 mt-4 px-8 sm:px-3">
      {allTasks &&
        allTasks.map(
          (task) =>
            task.status === currentStatus && (
              <div
                key={task._id}
                className="h-[18rem] flex flex-col gap-2 w-auto cursor-pointer relative 
                bg-cardBg border border-border p-3 rounded-md overflow-hidden"
              >
                <div className="flex w-full justify-between items-center">
                  <select
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
                    {hasMember && category && (
                      <div>
                        <div
                          className="text-indigo-600 text-2xl"
                          onClick={() => handleTaskAssign(task._id)}
                        >
                          <LuPlusCircle />
                        </div>
                        {openAssign[task._id] && (
                          <div
                            className="absolute h-[10rem] w-[10rem] custom-scroll overflow-y-auto top-12 p-2 bg-cardBg border border-border 
                                              z-[1000] right-14  rounded-md shadow-md shadow-indigo-500/20"
                          >
                            <p className="text-sm font-semibold text-center mb-2">
                              Assign to
                            </p>
                            {category.collaborators.length > 0 &&
                              category.collaborators.map((item) => (
                                <div
                                  key={item}
                                  onClick={() => handleAssign(task._id, item)}
                                  className="text-sm my-1 bg-background p-1 rounded-sm hover:bg-primaryColor transition-transition hover:text-cardBg"
                                >
                                  {item.slice(0, 8)}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

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
                  className="mt-3 overflow-hidden border border-border bg-background rounded-md h-[65%]"
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

                  <div className="absolute bottom-0 left-0 right-0 border-t border-border p-2 px-6 text-sm font-semibold">
                    {
                      <div className="flex items-center">
                        <p>Assigned to - {task.assignedTo.slice(0, 10)}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default GridView;
