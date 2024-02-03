import React from "react";
import NoTaskImage from "@/assets/notask.png";
const NoTask = () => {
  return (
    <div className="h-[50vh] w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src={NoTaskImage} alt="" className="h-20 w-20" />
        <h3 className="text-lg text-primaryColor">Oops! no task added yet 🙁</h3>
      </div>
    </div>
  );
};

export default NoTask;
