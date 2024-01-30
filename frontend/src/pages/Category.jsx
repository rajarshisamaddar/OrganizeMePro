import { setTasks } from "@/redux/slices/tasksSlice";
import { getTasksByCategory } from "@/utils/tasksService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TasksLayout from "@/components/Layouts/TasksLayout";
import { TbPlaylistAdd } from "react-icons/tb";
import GridView from "@/components/shared/GridView";
import ListView from "@/components/shared/ListView";
const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [gridView, setGridView] = useState(true);
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
    <TasksLayout
      name={category && category.title}
      setCurrentStatus={setCurrentStatus}
      currentStatus={currentStatus}
      gridView={gridView}
      setGridView={setGridView}
    >
      <div>
        <div className="w-full px-8 flex gap-3 justify-end sm:justify-center items-center">
          <button
            className="flex items-center gap-1 outline-dashed bg-transparent outline-indigo-600 p-2 px-4
                justify-center outline-[1.5px] rounded-md text-indigo-600 text-sm font-semibold 
                transition-transition hover:bg-indigo-600 hover:outline hover:text-white"
                onClick={()=>navigate(`/addTask/${id}`)}
          >
            <TbPlaylistAdd className="text-xl" />
            Add Task
          </button>
        </div>
        {gridView ? (
          <GridView allTasks={allTasks} currentStatus={currentStatus} />
        ) : (
          <ListView allTasks={allTasks} currentStatus={currentStatus} />
        )}
      </div>
    </TasksLayout>
  );
};

export default Category;
