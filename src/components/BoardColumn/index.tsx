import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { IBoardColumnProps } from "../../interfaces/board";
import { DotSVG } from "../Common/SVG/DotSVG";
import { TaskCard } from "./TaskCard";
import { TaskDetailsModal } from "../TaskDetailsModal";
import { setTask } from "../../store/slices/task";

export const BoardColumn:FC<IBoardColumnProps> = ({
  column
}) => {
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const dispatch = useDispatch();

  const loadTask = async (task: any) => {
    await dispatch(setTask(task));
    setShowTaskDetailsModal(true);
  }

  return (
    <>
      {column?.tasks?.length > 0 && (
        <div className="flex items-center">
          <DotSVG status={column.name}/>

          <span className="uppercase text-s tracking-wide text-gray-200 font-bold">
            {column.name} {`(${column.tasks.length})`}
          </span>
        </div>
      )}

      {column.tasks?.map((task, index) => {
        return (
          <TaskCard
            key={index}
            task={task}
            setShowModal={() => loadTask(task)}
          />
        )
      })}

      {showTaskDetailsModal && (
        <TaskDetailsModal
          setShowModal={setShowTaskDetailsModal}
        />
      )}
    </>

  )
};