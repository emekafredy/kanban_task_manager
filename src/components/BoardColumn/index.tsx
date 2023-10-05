import { FC } from "react";
import { IBoardColumnProps } from "../../interfaces/board";
import { DotSVG } from "../common/SVG/DotSVG";

export const BoardColumn:FC<IBoardColumnProps> = ({
  column
}: IBoardColumnProps) => {
  return (
    <>
      {column?.tasks?.length > 0 && (
        <div className="flex items-center">
          <DotSVG status={column.name}/>

          <span className="uppercase text-s tracking-wide text-gray font-bold">
            {column.name} {`(${column.tasks.length})`}
          </span>
        </div>
      )}

      {column.tasks?.map((task, index) => {
        const completed = task.subtasks.filter(task => task.isCompleted).length;

        return (
          <div
            key={index}
            className="block p-4 bg-white rounded-lg shadow hover:cursor-pointer dark:bg-black-200 w-[300px] my-4"
          >
            <h5 className="mb-2 text-m font-bold text-black-400 dark:text-white">
              {task.title}
            </h5>
            <p className="text-s text-gray">
              {completed} out of {task.subtasks.length} sub-tasks
            </p>
          </div>
        )
      })}
    </>
  )
};
