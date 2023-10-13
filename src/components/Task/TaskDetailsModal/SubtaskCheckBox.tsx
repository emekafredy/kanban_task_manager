import { FC } from "react";
import { ISubtaskCheckBoxProps } from "../../../interfaces/task";

export const SubtaskCheckBox:FC<ISubtaskCheckBoxProps> = ({
  id,
  subtask,
  handleTaskUpdate
}) => {
  return (
    <li className="w-full text-black-400 bg-silver-300 dark:bg-black-300
      py-4 px-2 rounded mt-3 cursor-pointer hover:bg-purple-400 dark:hover:bg-purple-400">
      <div className="flex items-center pl-3">
        <input
          id={String(id)}
          type="checkbox"
          checked={subtask.isCompleted}
          className={`w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer
            ${subtask.isCompleted ? 'accent-purple-200' : 'accent-black-200'}`}
          onChange={() => handleTaskUpdate('subtask', '', subtask)}
        />
        <label
          htmlFor={String(id)}
          className={`w-full ml-4 text-s font-bold cursor-pointer
            ${subtask.isCompleted ? 'text-gray-200 line-through' : 'text-black-300 dark:text-white'}`}
        >
            {subtask.title}
        </label>
      </div>
    </li>
  )
};
