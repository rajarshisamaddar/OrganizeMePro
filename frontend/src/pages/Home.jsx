import React, { useState, useEffect } from "react";
import axiosCustom from "../utils/axiosCustom";
import AddTopics from "@/components/Topics/AddTopics";
import { getAllTasks } from "@/utils/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/slices/tasksSlice";
import Markdown from "react-markdown";
import MarkDownEditor from "@/components/Tasks/MarkDownEditor";
const Home = () => {
  const dispatch = useDispatch();
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
    <div className="mt-3 md:mt-20 p-4 sm:p-2">
      <AddTopics />
      <div>
        <div>
          <h1 className="text-xl font-semibold mb-4">All Tasks</h1>
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

export default Home;
