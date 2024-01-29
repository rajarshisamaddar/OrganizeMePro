import AddTasks from "@/components/Tasks/AddTasks";
import { setTasks } from "@/redux/slices/tasksSlice";
import { getTasksByCategory } from "@/utils/tasksService";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import MarkDownEditor from "@/components/Tasks/MarkDownEditor";
const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const category = categories && categories.find((item) => item._id === id);
  const { allTasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    const getTasks = async () => {
      const categoryWiseTask = await getTasksByCategory(id);
      if (categoryWiseTask) {
        dispatch(setTasks(categoryWiseTask));
      }
    };
    getTasks();
  }, [id]);
  return (
    <div className="mt-3 md:mt-20  p-4 sm:p-2">
      <div>
        <h1>{category && category.title}</h1>
        <div className="w-full my-4 flex justify-end items-center pr-2">
          <button
            className="mt-4 p-2 rounded-md outline-dashed outline-1 outline-primaryColor px-4 flex justify-center items-center gap-1 
            text-primaryColor hover:bg-primaryColor transition-transition hover:text-cardBg hover:outline-none"
            onClick={() => navigate(`/addTask/${id}`)}
          >
            <MdOutlinePlaylistAdd className="text-xl" /> Add Task
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
          {allTasks &&
            allTasks.map((task) => (
              <div
                key={task._id}
                className="h-auto w-auto  bg-cardBg border border-border p-3 rounded-md overflow-hidden"
              >
                <p className="text-lg capitalize my-1 text-indigo-600">
                  {task.title}
                </p>
                <p className="text-sm capitalize my-2 text-green-500">
                  {task.status}
                </p>
                <MarkDownEditor
                  markdown={
                    task.description.length > 50
                      ? task.description.slice(0, 60) + "\n...Read More"
                      : task.description
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
