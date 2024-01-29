import React from "react";
import { RxCross2 } from "react-icons/rx";
const CrudLayout = ({ children, onClick, isTask }) => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-[100000]">
      <div className="flex h-full w-full justify-center items-center text-5xl text-white">
        <div
          className={`h-fit ${
            isTask ? "w-[70%]" : "w-[40%]"
          } md:w-[90%] sm:w-[93%] m-auto bg-cardBg relative p-4 pb-6 rounded-md border border-border`}
        >
          <div
            className="absolute top-0 right-0 bg-primaryColor text-2xl text-cardBg cursor-pointer
            hover:bg-secondaryColor transition-transition"
            onClick={onClick}
          >
            <RxCross2 />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CrudLayout;
