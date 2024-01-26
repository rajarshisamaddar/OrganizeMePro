import React, { useState } from "react";
import { categoryData } from "@/data/categoryData";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import BarContent from "./barContent";
import { RxCross2 } from "react-icons/rx";
const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  return (
    <aside
      className={`h-screen overflow-y-auto bg-cardBg w-[300px] p-3 ${
        open ? "md:left-0" : "md:left-[-110%]"
      } transition-transition
    md:w-[300px] md:fixed flex relative flex-col overflow-x-hidden border border-border z-[1000]`}
    >
      <div
        className="text-xl right-0 top-0 absolute bg-primaryColor p-1 text-cardBg cursor-pointer font-semibold hidden md:block"
        onClick={() => setOpen(false)}
      >
        <RxCross2 />
      </div>
      <nav>
        <div className="gap-4 flex flex-col justify-center">
          <h1 className="my-2 text-xl font-semibold">Topics</h1>
          <ul className="flex flex-col gap-4">
            <div
              onClick={() => {
                navigate(`/`);
              }}
              className={`p-2 px-4 w-full transition-transition  border border-border 
              rounded-borderRadius text-sm font-semibold cursor-pointer 
              hover:bg-primaryColor hover:text-white dark:hover:text-black ${
                location.pathname === "/"
                  ? "bg-[#4463ee] text-white dark:bg-[#89fa00] dark:text-black"
                  : "bg-transparent"
              }`}
            >
              <div className="flex w-full items-center gap-2">
                <p
                  className="h-[2.2rem] w-[2.2rem] border border-border bg-gray-500 rounded-full text-[.7rem] flex justify-center 
                  items-center
                text-white"
                >
                  AL
                </p>
                <p>All Topics</p>
              </div>
            </div>
            <BarContent categoryData={categoryData} navigate={navigate} />
          </ul>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4 border-primaryColor">
          <div className="flex justify-center w-full items-center">
            <button
              className="flex items-center gap-1 outline-dashed bg-transparent outline-primaryColor p-2 px-4
        justify-center outline-[1.5px] rounded-md
        text-primaryColor text-sm font-semibold transition-transition hover:bg-primaryColor hover:outline hover:text-cardBg"
            >
              <HiMiniPlus className="text-base" /> Add Category
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
