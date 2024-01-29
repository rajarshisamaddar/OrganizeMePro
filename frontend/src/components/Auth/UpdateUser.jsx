import { getAcronym } from "@/data/getAcronym";
import { isDarkColor } from "@/data/randomColor";
import React from "react";
import { useSelector } from "react-redux";
import UpdateForm from "./UpdateForm";
import CrudLayout from "../Layouts/CrudLayout";
const UpdateUser = ({ setOpenUpdate }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <CrudLayout onClick={() => setOpenUpdate(false)}>
      <div className="flex  flex-col items-center h-full w-full">
        <div
          className={`h-[4rem] w-[4rem] rounded-full border border-border flex justify-center ${
            isDarkColor(user.style.color) === true ? "text-white" : "text-black"
          }
            items-center text text-2xl`}
          style={{ backgroundColor: user.style.color }}
        >
          {getAcronym(user.fullName)}
        </div>

        <div className="mt-4 w-full text-sm text-textColor">
          <UpdateForm setOpenUpdate={setOpenUpdate} />
        </div>
      </div>
    </CrudLayout>
  );
};

export default UpdateUser;
