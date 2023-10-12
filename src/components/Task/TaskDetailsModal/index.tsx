import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../Common/Modal";
import { ITaskDetailsModalProps, SubtaskProps, TaskProps } from "../../../interfaces/task";
import { Select } from "../../Common/Forms/Select";
import { getAllBoardsState } from "../../../store/slices/board";
import { updateTask } from "../../../crudServices/task";
import { orderData } from "../../../helper/utils";
import { setBoards, setSingleBoard } from "../../../store/slices/board";
import { setTask } from "../../../store/slices/task";
import { getTasksState } from "../../../store/slices/task";
import { IBoardObjectProps } from "../../../interfaces/board";
import { renderSuccessMessage, renderErrorMessage } from "../../../helper/toaster";
import { OptionsMenu } from "../../Common/OptionsMenu";
import { TaskFormModal } from "../TaskFormModal";
import { TaskInfo } from "./TaskInfo";

export const TaskDetailsModal:FC<ITaskDetailsModalProps> = ({
  setShowModal: setShowTaskDetailsModal,
  setShowDeleteTaskModal: setShowDeleteTaskModal
}) => {
  const { board, boards } = useSelector(getAllBoardsState);
  const { task } = useSelector(getTasksState);
  const dispatch = useDispatch();

  const [showTaskMenuOptions, setShowTaskMenuOptions] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status || '');
  const [statuses] = useState<string[]>((board && board.columns.map(col => col.name)) || []);

  const [showEditTaskFormModal, setShowEditTaskFormModal] = useState<boolean>(false);

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
      renderErrorMessage(err as Error);
    }
  }

  return (
    <>
      <Modal
        title={task.title}
        children={
          <div className="p-8">
            <TaskInfo
              task={task}
              handleTaskUpdate={handleTaskUpdate}
            />

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
        showMenuOptions={showTaskMenuOptions}
        setShowMenuOptions={setShowTaskMenuOptions}
        menuOptions={
          <OptionsMenu
            editText="Edit Task"
            deleteText="Delete Task"
            setShowEditModal={setShowEditTaskFormModal}
            setShowDeleteModal={setShowDeleteTaskModal}
            setShowPrevModal={setShowTaskMenuOptions}
            setShowTaskDetailsModal={setShowTaskDetailsModal}
            task
          />
        }
      />

      {showEditTaskFormModal && (
        <TaskFormModal setShowModal={setShowEditTaskFormModal} mode="update"/>
      )}
    </>
  )
};
