import React from "react";
import MarkDownEditor from "../Tasks/MarkDownEditor";
import { MdUnarchive } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUpdatedTask } from "@/redux/slices/tasksSlice";
import { MdArchive } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const GridView = ({ allTasks, currentStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 mt-4 px-8 sm:px-3">
      {allTasks &&
        allTasks.map(
          (task) =>
            task.status === currentStatus && (
              <div
                key={task._id}
                className="h-auto w-auto cursor-pointer bg-cardBg border border-border p-3 rounded-md overflow-hidden"
                onClick={()=>navigate(`/viewTask/${task._id}`)}
              >
                <div className="flex w-full justify-between items-center">
                  <p className="text-lg capitalize my-1">{task.title}</p>
                  <div
                    className="text-xl cursor-pointer text-[#9d6b53]"
                    onClick={() =>
                      dispatch(
                        setUpdatedTask({
                          ...task,
                          status:
                            task.status !== "archived" ? "archived" : "pending",
                        })
                      )
                    }
                  >
                    {task.status === "archived" ? (
                      <MdUnarchive />
                    ) : (
                      <MdArchive />
                    )}
                  </div>
                </div>
                <MarkDownEditor
                  markdown={
                    task.description.length > 50
                      ? task.description.slice(0, 60)
                      : task.description
                  }
                />
              </div>
            )
        )}
    </div>
  );
};

export default GridView;
