import { FC } from "react";
import { ITaskInfoProps } from "../../../interfaces/task";

export const TaskInfo:FC<ITaskInfoProps> = ({
  task,
  handleTaskUpdate
}) => {
  return (
    <>
      <p className="text-gray-200 mb-8 text-m leading-7">
        {task.description}
      </p>

      {task.subtasks && task.subtasks?.length > 0 && (
        <p className="text-s text-gray-200 dark:text-white font-bold">
          Subtasks {`(${task.subtasks.filter(task => task.isCompleted).length} of ${task.subtasks.length})`}
        </p>
      )}

      <ul className="w-full text-s font-extrabold bg-white dark:bg-black-200 mt-4">
        {task.subtasks.map((st, i) => {
          return (
            <li key={i} className="w-full text-black-400 bg-silver-100 dark:bg-black-300 py-3 px-2 rounded mt-3">
              <div className="flex items-center pl-3">
                <input
                  id={String(i)}
                  type="checkbox"
                  checked={st.isCompleted}
                  className={`w-5 h-5 text-blue-600 border-gray-300 rounded bg-purple-200 cursor-pointer
                    ${st.isCompleted ? 'accent-purple-200' : 'accent-black-200'}`}
                  onChange={() => handleTaskUpdate('subtask', '', st)}
                />
                <label
                  htmlFor={String(i)}
                  className={`w-full ml-4 text-s font-bold ${st.isCompleted ? 'text-gray-200' : 'text-black-300 dark:text-white'}`}
                >
                    {st.title}
                </label>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
};
