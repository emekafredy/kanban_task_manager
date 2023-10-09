import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../Common/Modal";
import { Input } from "../Common/Forms/Input";
import { Button } from "../Common/Forms/Button";
import { GroupInput } from "../Common/Forms/GroupInput";
import { getAllBoardsState, setBoards } from "../../store/slices/board";
import { IBoardObjectProps } from "../../interfaces/board";
import { IFormModalProps } from "../../interfaces/common";
import { createBoard } from "../../crudServices/boards";
import { newBoardFormSchema } from "../../validation/boardSchema";
import { renderSuccessMessage, renderErrorMessage } from "../../helper/toaster";

type BoardFormType = z.infer<typeof newBoardFormSchema>;

export const BoardFormModal:FC<IFormModalProps> = ({
  setShowModal: setShowBoardFormModal
}) => {
  const { boards } = useSelector(getAllBoardsState);
  const [boardColumns, setBoardColumns] = useState<string[]>(['Todo', 'Doing', 'Done']);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormType>({
    resolver: zodResolver(newBoardFormSchema),
  });
  const dispatch = useDispatch();

  const submitHandler = async (data: BoardFormType) => {
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
      renderErrorMessage()
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
    column = value;
    columns[Number(id)] = column;

    setBoardColumns([...columns]);
  }

  return (
    <Modal
      title={"Add New Board"}
      children={
        <form
          className="p-8"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            hasLabel={true}
            errors={errors}
            formLabel="Name"
            formTitle="name"
            inputType="text"
            placeholder="e.g. Web Design"
            register={register}
          />


          <label
            className="block text-gray-200 text-s font-semibold mb-2 mt-8"
            htmlFor="columns"
          >
            Columns
          </label>

          {boardColumns.map((col, i) => {
            return (
              <GroupInput
                key={i}
                inputId={String(i)}
                removeInput={(e) => handleRemoveColumn(e, col)}
                value={col}
                handleChange={(e) => handleColumnChange(e)}
              />
            )
          })}

          <div className="mb-4">
            <Button
              silver
              buttonType="button"
              title="Add New Column"
              fullwidth
              roundedBG
              handleClick={() => handleAddColumn()}
              disabled={boardColumns[boardColumns.length - 1] === ''}
            />
          </div>

          <div>
            <Button
              purple
              buttonType="submit"
              title="Create New Board"
              fullwidth
              roundedBG
              disabled={loading}
            />
          </div>
        </form>
      }
      setShowModal={setShowBoardFormModal}
    />
  )
};
