import React, { useState, useEffect } from "react";
import AddTopics from "@/components/Topics/AddTopics";
import { getAllTasks } from "@/utils/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/slices/tasksSlice";
import TasksLayout from "@/components/Layouts/TasksLayout";
import GridView from "@/components/shared/GridView";
import ListView from "@/components/shared/ListView";
const Home = () => {
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [gridView, setGridView] = useState(true);
  const { allTasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    const getTasks = async () => {
      const allTaskGet = await getAllTasks();
      if (allTaskGet) {
        dispatch(setTasks(allTaskGet));
      }
    };
    getTasks();
  }, []);
  return (
    <TasksLayout
      name="All Tasks"
      currentStatus={currentStatus}
      setCurrentStatus={setCurrentStatus}
      gridView={gridView}
      setGridView={setGridView}
    >
      <AddTopics />
      {gridView ? (
        <GridView allTasks={allTasks} currentStatus={currentStatus} />
      ) : (
        <ListView allTasks={allTasks} currentStatus={currentStatus} />
      )}
    </TasksLayout>
  );
};

export default Home;
