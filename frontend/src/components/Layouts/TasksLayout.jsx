import React from "react";
import { useState, useEffect } from "react";
import AddTopics from "@/components/Topics/AddTopics";
import { getAllTasks } from "@/utils/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { setLayout, setTasks } from "@/redux/slices/tasksSlice";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { taskStatus } from "@/data/taskStatus";
import { getAcronym } from "@/data/getAcronym";
const TasksLayout = ({
  category,
  children,
  currentStatus,
  setCurrentStatus,
  hasMember,
}) => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state) => state.tasks);
  const {collaborators} = useSelector((state)=>state.category);
  return (
    <div className="mt-1 md:mt-[4.3rem] mb-8 transition-transition">
      <div className="flex flex-col justify-center gap-3">
        <div className="bg-cardBg border border-border px-4 pt-4 flex flex-col justify-center gap-8">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-xl font-semibold">{category.title}</h1>
            {hasMember && (
              <div className="flex items-center">
                {collaborators.length > 0 &&
                  collaborators
                    .map((item) => (
                      <div
                        key={item.name}
                        className="h-[2.5rem] w-[2.5rem] flex justify-center items-center text-sm rounded-full
                        first:ml-0 ml-[-.7rem] border border-border"
                        style={{backgroundColor:item.style.color}}
                      >
                        {getAcronym(item.name)}
                      </div>
                    ))
                    .slice(0, 2)}
                {category.collaborators.length > 2 && (
                  <p
                    className="h-[2.5rem] w-[2.5rem] rounded-full border border-indigo-600 bg-indigo-200 flex justify-center 
                font-semibold text-sm items-center ml-[-.7rem] text-indigo-600"
                  >
                    +{category.collaborators.length - 2}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex w-full justify-between items-center sm:flex-col sm:gap-2">
            <ul className="flex items-center gap-2 sm:justify-center text-sm font-semibold">
              {taskStatus.map((status) => (
                <li
                  key={status.id}
                  onClick={() => setCurrentStatus(status.name)}
                  className={`capitalize cursor-pointer px-2 mx-2 sm:mx-1 sm:px-1 pb-3 flex justify-center 
                  items-center h-fit`}
                  style={
                    currentStatus === status.name
                      ? {
                          borderBottom: `1.5px solid ${status.color}`,
                          color: status.color,
                        }
                      : {}
                  }
                >
                  {status.name}
                </li>
              ))}
            </ul>
            <div className="flex  items-center gap-5 text-xl sm:hidden pb-3 cursor-pointer font-bold">
              <p>
                <IoGrid
                  onClick={() => dispatch(setLayout("grid"))}
                  className={`${layout === "grid" && "text-[#f20089]"}`}
                />
              </p>
              <p>
                <FaThList
                  onClick={() => dispatch(setLayout("list"))}
                  className={`${layout === "list" && "text-[#f20089]"}`}
                />
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TasksLayout;
