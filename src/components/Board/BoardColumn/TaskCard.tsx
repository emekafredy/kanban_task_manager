import { FC } from "react";
import { ITaskCardProps } from "../../../interfaces/task";

export const TaskCard:FC<ITaskCardProps> = ({
  task,
  setShowModal: setShowTaskDetailsModal
}) => {
  return (
    <div
      className="block p-4 bg-white rounded-lg shadow hover:cursor-pointer
        dark:bg-black-200 hover:bg-silver-400 dark:hover:bg-black-100 transition duration-300 w-[300px] my-4"
      onClick={() => setShowTaskDetailsModal(true)}
    >
      <h5 className="mb-2 text-m font-bold text-black-400 dark:text-white">
        {task.title}
      </h5>
      {task.subtasks && task.subtasks?.length > 0 && (
        <p className="text-s text-gray-200">
          {task.subtasks.filter(task => task.isCompleted).length} out of {task.subtasks.length} sub-tasks
        </p>
      )}
    </div>
  )
};
