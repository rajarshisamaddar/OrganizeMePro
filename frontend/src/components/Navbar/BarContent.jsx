import React, { useState } from "react";
import { getAcronym } from "../../data/getAcronym";
import { BsThreeDotsVertical } from "react-icons/bs";
import TopicUtils from "./TopicUtils";
const BarContent = ({ categoryData, navigate, dropdown, setDropdown }) => {
  const [showItem, setShowItem] = useState("");
  return categoryData.map((item) => (
    <li
      key={item.id}
      onMouseLeave={() => setDropdown(false)}
      className={`p-2 px-4 w-full transition-transition  border border-border 
        rounded-borderRadius text-sm font-semibold cursor-pointer 
        hover:bg-primaryColor hover:text-white dark:hover:text-black ${
          location.pathname === "/" + item.id
            ? "bg-[#5a189a] text-white dark:bg-[#89fa00] dark:text-black"
            : "bg-transparent"
        }`}
    >
      <div className="w-full relative">
        <div
          className="flex w-full items-center gap-2 relative"
          onClick={() => {
            navigate(`/${item.id}`);
          }}
        >
          <p
            className="h-[2.2rem] w-[2.2rem] border border-border bg-gray-500 rounded-full text-[.7rem] 
            flex justify-center items-center text-white"
          >
            {getAcronym(item.title)}
          </p>
          <p>{item.title}</p>
        </div>
        <p
          className="absolute right-0 top-1/2 -translate-y-1/2 text-base"
          onClick={() => {
            setDropdown((prev) => !prev);
            setShowItem(item.id);
          }}
        >
          <BsThreeDotsVertical />
        </p>

        {dropdown && showItem === item.id && <TopicUtils />}
      </div>
    </li>
  ));
};
export default BarContent;
