import React from "react";
import { IoMdShareAlt } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const TopicUtils = () => {
  return (
    <div
      className="absolute bg-cardBg my-2 right-[-.5rem] top-[110%] z-[100] rounded-borderRadius p-2 
    text-textColor shadow-lg shadow-indigo-500/20 border border-border"
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex items-center w-full gap-1 text-sm border border-border p-2 px-3  rounded-borderRadius">
          <p>Share</p>
          <p className="text-lg text-blue-600">
            <IoMdShareAlt />
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm border border-border p-2 px-3  rounded-borderRadius">
          <p>Update</p>
          <p className="text-lg text-green-600">
            <MdEditDocument />
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm border border-border p-2 px-3 rounded-borderRadius">
          <p>Delete</p>
          <p className="text-lg text-red-600">
            <MdDelete />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicUtils;
