import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsState, setBoards, setSingleBoard } from "../../../store/slices/board";
import { IFormModalProps } from "../../../interfaces/common";
import { ConfirmDeleteModal } from "../../Common/Modal/ConfirmDeleteModal";
import { deleteTask } from "../../../crudServices/task";
import { IBoardObjectProps } from "../../../interfaces/board";
import { renderErrorMessage, renderSuccessMessage } from "../../../helper/toaster";
import { getTasksState } from "../../../store/slices/task";
import { IColumnProps } from "../../../interfaces/column";

export const DeleteTaskModal:FC<IFormModalProps> = ({
  setShowModal: setShowDeleteTaskModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { board, boards } = useSelector(getAllBoardsState);
  const { task } = useSelector(getTasksState);
  const dispatch = useDispatch();

  const currentColumn = board.columns.find(c => c.name === task.status) as IColumnProps;

  const handleTaskDelete = async () => {
    setLoading(true);
    try {
      const { data, message } = await deleteTask(currentColumn, task, board, boards);

      await dispatch(setBoards([...data.boards] as IBoardObjectProps[]));
      await dispatch(setSingleBoard(data.board as IBoardObjectProps));

      setShowDeleteTaskModal(false);
      setLoading(false);
      renderSuccessMessage(message);
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error)
    }
  }

  return (
    <ConfirmDeleteModal
      title="Delete this task?"
      bodyText={
        `Are you sure you want to delete the "${task.title}" task and its subtasks?
        this action cannot be reversed`
      }
      setShowModal={setShowDeleteTaskModal}
      handleDelete={() => handleTaskDelete()}
      actionBtnLoading={loading}
    />
  )
};
