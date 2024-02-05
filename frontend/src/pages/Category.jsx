import { setTasks } from "@/redux/slices/tasksSlice";
import { getTasksByCategory } from "@/utils/tasksService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TasksLayout from "@/components/Layouts/TasksLayout";
import { TbPlaylistAdd } from "react-icons/tb";
import GridView from "@/components/shared/GridView";
import ListView from "@/components/shared/ListView";
import Loading from "@/components/Loading/Loading";
import NoTask from "@/components/Loading/NoTask";
import { getUserById } from "@/utils/userService";
import { setCollaborators } from "@/redux/slices/categorySlice";
const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("pending");
  const { categories } = useSelector((state) => state.category);
  const category = categories && categories.find((item) => item._id === id);
  const { allTasks, layout } = useSelector((state) => state.tasks);
  useEffect(() => {
    const getTasks = async () => {
      const categoryWiseTask = await getTasksByCategory(id);
      if (categoryWiseTask) {
        dispatch(setTasks(categoryWiseTask));
      }
    };
    getTasks();
  }, [id]);

  useEffect(() => {
    const getMembers = async () => {
      if (category) {
        const collaboratorsData = [];
        for (const userId of category.collaborators) {
          const response = await getUserById(userId);
          collaboratorsData.push(response);
        }
        dispatch(
          setCollaborators(
            collaboratorsData.length > 0 ? collaboratorsData : []
          )
        );
      }
    };
    getMembers();
  }, [category]);

  if (!category) return <Loading />;
  return (
    <TasksLayout
      category={category}
      setCurrentStatus={setCurrentStatus}
      currentStatus={currentStatus}
      hasMember={category.collaborators.length > 0 && true}
    >
      <div>
        <div className="w-full px-8 flex gap-3 justify-end sm:justify-center items-center">
          <button
            className="flex items-center gap-1 outline-dashed bg-transparent outline-indigo-600 p-2 px-4
                justify-center outline-[1.5px] rounded-md text-indigo-600 text-sm font-semibold 
                transition-transition hover:bg-indigo-600 hover:outline hover:text-white"
            onClick={() => navigate(`/addTask/${id}`)}
          >
            <TbPlaylistAdd className="text-xl" />
            Add Task
          </button>
        </div>
        {allTasks.length !== 0 ? (
          layout === "grid" ? (
            <GridView
              allTasks={allTasks}
              category={category}
              currentStatus={currentStatus}
              hasMember={category.collaborators.length > 0 && true}
            />
          ) : (
            <ListView
              allTasks={allTasks}
              category={category}
              currentStatus={currentStatus}
              hasMember={category.collaborators.length > 0 && true}
            />
          )
        ) : (
          <NoTask />
        )}
      </div>
    </TasksLayout>
  );
};

export default Category;
