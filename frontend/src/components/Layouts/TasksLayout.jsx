import React from "react";
import { useState, useEffect } from "react";
import AddTopics from "@/components/Topics/AddTopics";
import { getAllTasks } from "@/utils/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/slices/tasksSlice";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import MarkDownEditor from "@/components/Tasks/MarkDownEditor";
import { taskStatus } from "@/data/taskStatus";
const TasksLayout = ({
  name,
  children,
  currentStatus,
  setCurrentStatus,
  gridView,
  setGridView,
}) => {
  return (
    <div className="mt-1 md:mt-[4.3rem] mb-8 transition-transition">
      <div className="flex flex-col justify-center gap-3">
        <div className="bg-cardBg border border-border px-4 pt-4 flex flex-col justify-center gap-8">
          <h1 className="text-xl font-semibold">{name}</h1>
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
                  onClick={() => setGridView(true)}
                  className={`${gridView && "text-[#f20089]"}`}
                />
              </p>
              <p>
                <FaThList
                  onClick={() => setGridView(false)}
                  className={`${!gridView && "text-[#f20089]"}`}
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
