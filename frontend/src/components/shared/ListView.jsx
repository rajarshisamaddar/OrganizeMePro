import React, { useState } from "react";
import MarkDownEditor from "../Tasks/MarkDownEditor";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "@/utils/tasksService";
import { setUpdatedTask } from "@/redux/slices/tasksSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import AssignedTask from "./AssignedTask";

const ListView = ({ allTasks, currentStatus, hasMember, category }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const [openAssign, setOpenAssign] = useState({});
  const { collaborators } = useSelector((state) => state.category);
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

  const handleAssign = async (taskId, member) => {
    const assigned = await updateTask({
      id: taskId,
      data: { assignedTo: member._id },
    });
    if (assigned) {
      dispatch(setUpdatedTask(assigned));
      toast.success(`Assigned to ${member.name}`);
      setOpenAssign((prev) => ({ ...prev, [taskId]: false }));
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
                className="h-[18rem] relative flex flex-col gap-2 w-auto cursor-pointer 
                bg-cardBg border border-border p-3 rounded-md overflow-hidden"
                onMouseLeave={() =>
                  setOpenAssign((prev) => ({ ...prev, [task._id]: false }))
                }
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
                          onClick={() =>
                            setOpenAssign((prev) => ({
                              ...prev,
                              [task._id]: !prev[task._id],
                            }))
                          }
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
                            {collaborators.length > 0 &&
                              collaborators.map((item) => (
                                <div
                                  key={item._id}
                                  onClick={() => handleAssign(task._id, item)}
                                  className="text-sm my-1 bg-background p-1 rounded-sm hover:bg-primaryColor transition-transition 
                                  hover:text-cardBg"
                                >
                                  {item.name}
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
                  className="mt-3 overflow-hidden border-t border-border h-[65%] bg-background rounded-md"
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
                  {hasMember && (
                    <div className="absolute bottom-0 left-0 right-0 border-t border-border p-2 px-4 text-sm font-semibold">
                      <AssignedTask task={task} />
                    </div>
                  )}
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default ListView;
