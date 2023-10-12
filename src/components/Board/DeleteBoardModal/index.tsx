import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllBoardsState, setBoards, setSingleBoard } from "../../../store/slices/board";
import { IFormModalProps } from "../../../interfaces/common";
import { ConfirmDeleteModal } from "../../Common/Modal/ConfirmDeleteModal";
import { deleteBoard } from "../../../crudServices/board";
import { IBoardObjectProps } from "../../../interfaces/board";
import { renderErrorMessage, renderSuccessMessage } from "../../../helper/toaster";

export const DeleteBoardModal:FC<IFormModalProps> = ({
  setShowModal: setShowDeleteBoardModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { board, boards } = useSelector(getAllBoardsState);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBoardDelete = async () => {
    setLoading(true);
    try {
      const { data, message } = await deleteBoard(board, boards);

      if (data.length > 0) {
        await dispatch(setBoards([...data] as IBoardObjectProps[]));
        await setSearchParams({ board: data[0].name as string });
        await dispatch(setSingleBoard(data[0] as IBoardObjectProps));
      } else {
        searchParams.delete('board');
        setSearchParams(searchParams)
        await dispatch(setBoards([] as IBoardObjectProps[]));
      }

      setShowDeleteBoardModal(false)
      setLoading(false);
      renderSuccessMessage(message);
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error)
    }
  }

  return (
    <ConfirmDeleteModal
      title="Delete this board?"
      bodyText={
        `Are you sure you want to delete the "${board.name}" board? This
        action will remove all columns and tasks and cannot be reversed`
      }
      setShowModal={setShowDeleteBoardModal}
      handleDelete={() => handleBoardDelete()}
      actionBtnLoading={loading}
    />
  )
};
