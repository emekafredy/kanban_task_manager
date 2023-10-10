import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../Common/Modal";
import { ITaskDetailsModalProps, SubtaskProps, TaskProps } from "../../interfaces/task";
import { Select } from "../Common/Forms/Select";
import { getAllBoardsState } from "../../store/slices/board";
import { updateTask } from "../../crudServices/tasks";
import { orderData } from "../../helper/utils";
import { setBoards, setSingleBoard } from "../../store/slices/board";
import { setTask } from "../../store/slices/task";
import { getTasksState } from "../../store/slices/task";
import { IBoardObjectProps } from "../../interfaces/board";
import { renderSuccessMessage, renderErrorMessage } from "../../helper/toaster";

export const TaskDetailsModal:FC<ITaskDetailsModalProps> = ({
  setShowModal: setShowTaskDetailsModal,
}) => {
  const { board, boards } = useSelector(getAllBoardsState);
  const { task } = useSelector(getTasksState);
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(task.status || '');
  const [statuses] = useState<string[]>((board && board.columns.map(col => col.name)) || []);

  const handleTaskUpdate = async (change: string, status: string | '', subtask?: SubtaskProps) => {
    try {
      const [updatedBoard, updatedTask] = await updateTask({
        board,
        boards,
        change,
        subtask,
        task,
        status,
        prevStatus: selectedStatus,
      });

      const index = await boards.findIndex((b) => b.name === board.name)
      const currentBoards = await orderData(index, boards, updatedBoard)

      await dispatch(setTask(updatedTask as TaskProps));
      await dispatch(setSingleBoard(updatedBoard as IBoardObjectProps));
      await dispatch(setBoards([...currentBoards] as IBoardObjectProps[]));
      renderSuccessMessage('Task updated successfully');
    } catch (err) {
      renderErrorMessage();
    }
  }

  return (
    <Modal
      title={task.title}
      children={
        <div
          className="p-8"
        >
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

          <Select
            formLabel="Current Status"
            formTitle="status"
            optionsData={statuses}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
            mode="update"
            handleTaskStatusUpdate={handleTaskUpdate}
          />
        </div>
      }
      setShowModal={setShowTaskDetailsModal}
      closeBTN={false}
    />
  )
};
