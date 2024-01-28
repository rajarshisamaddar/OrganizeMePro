import React, { useState } from "react";
import { getAcronym } from "../../data/getAcronym";
import { BsThreeDotsVertical } from "react-icons/bs";
import TopicUtils from "./TopicUtils";
import { useSelector } from "react-redux";
import { isDarkColor } from "@/data/randomColor";
const BarContent = ({ navigate, dropdown, setDropdown }) => {
  const { categories } = useSelector((state) => state.category);
  // console.log(categories)
  const [showItem, setShowItem] = useState("");
  return categories.map((item) => (
    <li
      key={item._id}
      onMouseLeave={() => setDropdown(false)}
      className={`p-2 px-4 w-full transition-transition  border border-border 
        rounded-borderRadius text-sm font-semibold cursor-pointer 
        hover:bg-primaryColor hover:text-white dark:hover:text-black ${
          location.pathname === "/" + item._id
            ? "bg-[#5a189a] text-white dark:bg-[#89fa00] dark:text-black"
            : "bg-transparent"
        }`}
    >
      <div className="w-full relative capitalize">
        <div
          className="flex w-full items-center gap-2 relative"
          onClick={() => {
            navigate(`/${item._id}`);
          }}
        >
          <p
            className={`h-[2.2rem] w-[2.2rem] border border-border rounded-full text-[.7rem] 
            flex justify-center items-center text-white font-bold ${
              isDarkColor(item.style.theme) === true
                ? "text-white"
                : "text-black"
            }`}
            style={{ backgroundColor: item.style.theme }}
          >
            {getAcronym(item.title)}
          </p>
          <p>
            {item.title.length > 12
              ? item.title.slice(0, 12) + ".."
              : item.title}
          </p>
        </div>
        <p
          className="absolute right-0 top-1/2 -translate-y-1/2 text-base"
          onClick={() => {
            setDropdown((prev) => !prev);
            setShowItem(item._id);
          }}
        >
          <BsThreeDotsVertical />
        </p>

        {dropdown && showItem === item._id && <TopicUtils />}
      </div>
    </li>
  ));
};
export default BarContent;
