import React, {useState} from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddCollaborator from "../Topics/AddCollaborator";
import UpdateCategories from "../Topics/UpdateCategories";
const TopicUtils = ({item}) => {
  const [editMember, setEditMember] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  return (
    <div className="w-full rounded-md bg-background h-fit my-2 p-4">
      <div className="flex items-center justify-between gap-3 text-xl">
        <button className="text-indigo-600" onClick={()=>setEditMember(true)}>
          <FaShareAlt />
        </button>
        <button className="text-green-500" onClick={()=>setEditCategory(true)}>
          <MdEditDocument />
        </button>
        <button className="text-red-500">
          <MdDelete />
        </button>
      </div>
      {
        editMember && <AddCollaborator setEditMember={setEditMember} category={item} />
      }

      {
        editCategory && <UpdateCategories setEditCategory={setEditCategory} category={item} />
      }
    </div>
  );
};

export default TopicUtils;
