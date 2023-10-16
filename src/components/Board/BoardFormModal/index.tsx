import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../../Common/Modal";
import { Input } from "../../Common/Forms/Input";
import { Button } from "../../Common/Forms/Button";
import { GroupInput } from "../../Common/Forms/GroupInput";
import { getAllBoardsState, setBoards, setSingleBoard } from "../../../store/slices/board";
import { IBoardObjectProps } from "../../../interfaces/board";
import { IFormModalProps } from "../../../interfaces/common";
import { createBoard, updateBoard } from "../../../crudServices/board";
import { newBoardFormSchema } from "../../../validation/boardSchema";
import { renderSuccessMessage, renderErrorMessage, renderInfoMessage } from "../../../helper/toaster";
import { orderData, checkExistingColumn } from "../../../helper/utils";

type BoardFormType = z.infer<typeof newBoardFormSchema>;

const initialColumns = [
  {name: "Todo", tasks: []},
  {name: "Doing", tasks: []},
  {name: "Done", tasks: []},
];

export const BoardFormModal:FC<IFormModalProps> = ({
  setShowModal: setShowBoardFormModal,
  mode
}) => {
  const [_, setSearchParams] = useSearchParams();
  const { boards, board } = useSelector(getAllBoardsState);
  const [loading, setLoading] = useState<boolean>(false);
  const exisitingColumns = board?.columns;

  const [boardName] = useState<string>(board?.name || '');
  const [boardColumns, setBoardColumns] = useState<any[]>(
    mode === "update" ? (exisitingColumns || []) : initialColumns
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormType>({
    resolver: zodResolver(newBoardFormSchema),
  });
  const dispatch = useDispatch();

  const createBoardHandler = async (data: BoardFormType) => {
    try {
      setLoading(true);
      const newBoard = await createBoard({
        name: data.name,
        columns: boardColumns,
        boards
      })

      await dispatch(setBoards([...boards, newBoard] as IBoardObjectProps[]));
      setLoading(false);
      setShowBoardFormModal(false);
      renderSuccessMessage('Board saved successfully');
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error);
    }
  };

  const updateBoardHandler = async (data: BoardFormType) => {
    try {
      setLoading(true);
      const {data: updatedBoard, message} = await updateBoard({
        board,
        name: data.name,
        columns: boardColumns,
        boards
      });

      if (Object.keys(updatedBoard).length) {
        const boardIndex = await boards.findIndex((b) => b.name === board.name);
        const currentBoards = await orderData(boardIndex, boards, updatedBoard)
  
        await dispatch(setBoards([...currentBoards] as IBoardObjectProps[]));
        setSearchParams({ board: updatedBoard.name as string });
        await dispatch(setSingleBoard(updatedBoard as IBoardObjectProps));
        renderSuccessMessage(message);
      } else {
        renderInfoMessage(message);
      }

      setLoading(false);
      setShowBoardFormModal(false);
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error);
    }
  };

  const handleAddColumn = () => {
    const newColumn = '';
    setBoardColumns(prev => [...prev, newColumn])
  }

  const handleRemoveColumn = (e: any, val: string) => {
    e.preventDefault();
    const filteredBoardColumns = boardColumns.filter((col) => col != val);
    setBoardColumns([...filteredBoardColumns])
  }

  const handleColumnChange = (e: any) => {
    const {id, value} = e.target;
    let columns = [...boardColumns];
    let column = columns[Number(id)];
    column = {name: value, tasks: []};
    columns[Number(id)] = column;

    setBoardColumns([...columns]);
  }

  return (
    <Modal
      title={mode === "update" ? "Edit Board" : "Add New Board"}
      children={
        <form
          className="p-8"
          onSubmit={
            handleSubmit(mode === "update" ? updateBoardHandler : createBoardHandler)
          }
        >
          <Input
            hasLabel={true}
            errors={errors}
            formLabel="Board Name"
            formTitle="name"
            inputType="text"
            placeholder="e.g. Web Design"
            register={register}
            value={mode === "update" ? boardName : ""}
          />

          <label
            className="block text-gray-200 dark:text-white text-s font-semibold mb-2 mt-8"
            htmlFor="columns"
          >
            Board Columns
          </label>
          <div className="mb-3">
            {boardColumns.map((col, i) => {
              const hasTasks = checkExistingColumn(mode, col, exisitingColumns);

              return (
                <GroupInput
                  key={i}
                  inputId={String(i)}
                  removeInput={(e) => handleRemoveColumn(e, col)}
                  value={col.name}
                  handleChange={(e) => handleColumnChange(e)}
                  inputDisabled={hasTasks}
                  rmvBtnDisabled={hasTasks}
                />
              )
            })}
          </div>

          <div className="mb-4">
            <Button
              secondary
              large
              fullwidth
              roundedBG
              buttonType="button"
              title="Add New Column"
              handleClick={() => handleAddColumn()}
              disabled={boardColumns[boardColumns.length - 1] === ''}
            />
          </div>

          <div>
            <Button
              primary
              fullwidth
              roundedBG
              large
              buttonType="submit"
              title={mode === "update" ? "Save Changes" : "Create New Board"}
              disabled={loading}
            />
          </div>
        </form>
      }
      setShowModal={setShowBoardFormModal}
    />
  )
};
