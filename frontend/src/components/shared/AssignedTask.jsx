import React from "react";
import { useSelector } from "react-redux";

const AssignedTask = ({task}) => {
  const {collaborators} = useSelector((state)=>state.category);
  const assignedMember = collaborators.find((item)=>item._id===task.assignedTo);
  return (
    <div className="flex items-center text-sm text-gray-400">
      {
        assignedMember ? <p>Assigned to - {assignedMember.name}</p> : <p>Assigned to - Me</p>
      }
    </div>
  );
};

export default AssignedTask;
