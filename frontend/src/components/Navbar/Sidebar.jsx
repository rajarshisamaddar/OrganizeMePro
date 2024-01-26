import React, { useState } from "react";
import { categoryData } from "@/data/categoryData";
import { HiMiniPlus } from "react-icons/hi2";
import { getAcronym } from "./getAcronym";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "@/redux/slices/categorySlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const active = useSelector((state) => state.category.activeCategory);
  const [open, setOpen] = useState(false);
  console.log(open)
  return (
    <nav className="h-screen overflow-y-auto bg-cardBg w-[300px] p-3 flex relative flex-col overflow-x-hidden">
      <div className="gap-4 flex flex-col justify-center">
        <h1 className="my-2 text-xl font-semibold">Topics</h1>
        <ul className="flex flex-col gap-4">
          <h1>All</h1>
          {categoryData.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                navigate(`/${item.title.replace(" ", "")}/${item.id}`);
                dispatch(setActiveCategory(item.title));
              }}
              className={`p-2 px-4 w-full transition-transition bg-transparent border border-border 
              rounded-borderRadius text-sm font-semibold cursor-pointer 
              hover:bg-primaryColor hover:text-white dark:hover:text-black ${
                active === item.title
                  ? "bg-[#4463ee] text-white dark:bg-[#89fa00] dark:text-black"
                  : ""
              }`}
            >
              <div className="flex w-full items-center gap-2 relative">
                <p
                  className="h-[2.2rem] w-[2.2rem] border border-border bg-gray-500 rounded-full text-[.7rem] flex justify-center items-center
                text-white"
                >
                  {getAcronym(item.title)}
                </p>
                <p>{item.title}</p>
                <p
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-base"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <BsThreeDotsVertical />
                </p>

                {open && (
                  <div className="absolute bg-background my-2 border right-0 top-[80%] z-[100] p-2 hidden">
                    <div>
                      <div className="flex items-center gap-1 text-sm">
                        <p>Share</p>
                        <p className="text-lg">
                          <IoMdShareAlt />
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <p>Update</p>
                        <p className="text-lg">
                          <IoMdShareAlt />
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <p>Delete</p>
                        <p className="text-lg">
                          <IoMdShareAlt />
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t p-4 border-primaryColor">
        <div className="flex justify-center w-full items-center">
          <button
            className="flex items-center gap-1 outline-dashed bg-transparent outline-primaryColor p-2 px-4
        justify-center outline-[1.5px] rounded-md
        text-primaryColor text-sm font-semibold transition-transition hover:bg-primaryColor hover:outline hover:text-white dark:hover:text-black"
          >
            <HiMiniPlus className="text-base" /> Add Category
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
