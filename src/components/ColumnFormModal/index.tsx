import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../Common/Modal";
import { Input } from "../Common/Forms/Input";
import { Button } from "../Common/Forms/Button";
import { getAllBoardsState, setBoards } from "../../store/slices/board";
import { IBoardObjectProps } from "../../interfaces/board";
import { IFormModalProps } from "../../interfaces/common";
import { createBoard } from "../../crudServices/boards";
import { newBoardFormSchema } from "../../validation/boardSchema";
import { renderSuccessMessage, renderErrorMessage } from "../../helper/toaster";

type BoardFormType = z.infer<typeof newBoardFormSchema>;

export const ColumnFormModal:FC<IFormModalProps> = ({
  setShowModal: setShowColumnFormModal
}) => {
  const { boards } = useSelector(getAllBoardsState);
  const [boardColumns] = useState<string[]>(['Todo', 'Doing', 'Done']);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormType>({
    resolver: zodResolver(newBoardFormSchema),
  });
  const dispatch = useDispatch();

  const saveColumnHandler = async (data: BoardFormType) => {
    try {
      setLoading(true);
      const newBoard = await createBoard({
        name: data.name,
        columns: boardColumns,
        boards
      })
    
      await dispatch(setBoards([...boards, newBoard] as IBoardObjectProps[]));
      setLoading(false);
      setShowColumnFormModal(false);
      renderSuccessMessage('Board saved successfully');
    } catch (err) {
      renderErrorMessage()
    }
  };

  return (
    <Modal
      title={"Add New Column"}
      children={
        <form
          className="p-8"
          onSubmit={handleSubmit(saveColumnHandler)}
        >
          <Input
            hasLabel={true}
            errors={errors}
            formLabel="Column Name"
            formTitle="name"
            inputType="text"
            placeholder="e.g. In Progress"
            register={register}
          />

          <div>
            <Button
              purple
              buttonType="submit"
              title="Create New Column"
              fullwidth
              roundedBG
              disabled={loading}
            />
          </div>
        </form>
      }
      setShowModal={setShowColumnFormModal}
    />
  )
};
