import { FC } from "react";
import { ITaskInfoProps } from "../../../interfaces/task";
import { SubtaskCheckBox } from "./SubtaskCheckBox";

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
            <SubtaskCheckBox
              key={i}
              id={i}
              subtask={st}
              handleTaskUpdate={handleTaskUpdate}
            />
          )
        })}
      </ul>
    </>
  )
};
