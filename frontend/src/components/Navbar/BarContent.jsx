import React from "react";
import { getAcronym } from "./getAcronym";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
const BarContent = ({categoryData, navigate }) => {
  return categoryData.map((item) => (
    <li
      key={item.id}
      onClick={() => {
        navigate(`/${item.id}`);
      }}
      className={`p-2 px-4 w-full transition-transition  border border-border 
        rounded-borderRadius text-sm font-semibold cursor-pointer 
        hover:bg-primaryColor hover:text-white dark:hover:text-black ${
          location.pathname === "/" + item.id
            ? "bg-[#4463ee] text-white dark:bg-[#89fa00] dark:text-black"
            : "bg-transparent"
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
        //   onClick={() => setOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical />
        </p>

        {/* {open && (
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
            )} */}
      </div>
    </li>
  ));
};
export default BarContent;
