import React from "react";
import MarkDownEditor from "../Tasks/MarkDownEditor";

const ListView = ({allTasks, currentStatus}) => {
  return (
    <div className="flex flex-col gap-4 mt-4 px-8 sm:px-3">
      {allTasks &&
        allTasks.map(
          (task) =>
            task.status === currentStatus && (
              <div
                key={task._id}
                className="h-auto w-auto  bg-cardBg border border-border p-3 rounded-md overflow-hidden"
              >
                <p className="text-lg capitalize my-1 text-indigo-600">
                  {task.title}
                </p>
                <p className="text-sm capitalize my-2 text-green-500">
                  {task.status}
                </p>

                <MarkDownEditor
                  markdown={
                    task.description.length > 50
                      ? task.description.slice(0, 60) + "\n...Read More"
                      : task.description
                  }
                />
              </div>
            )
        )}
    </div>
  );
};

export default ListView;
