import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../Common/Modal";
import { Input } from "../Common/Forms/Input";
import { Button } from "../Common/Forms/Button";
import { getAllBoardsState, setBoards, setSingleBoard } from "../../store/slices/board";
import { IBoardObjectProps } from "../../interfaces/board";
import { IFormModalProps } from "../../interfaces/common";
import { createColumn } from "../../crudServices/columns";
import { newColumnFormSchema } from "../../validation/columnSchema";
import { renderSuccessMessage, renderErrorMessage } from "../../helper/toaster";
import { orderData } from "../../helper/utils";

type ColumnFormType = z.infer<typeof newColumnFormSchema>;

export const ColumnFormModal:FC<IFormModalProps> = ({
  setShowModal: setShowColumnFormModal
}) => {
  const { boards, board } = useSelector(getAllBoardsState);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnFormType>({
    resolver: zodResolver(newColumnFormSchema),
  });
  const dispatch = useDispatch();

  const saveColumnHandler = async (data: ColumnFormType) => {
    try {
      setLoading(true);
      const updatedBoard = await createColumn({
        name: data.name,
        board,
        boards
      })

      const index = await boards.findIndex((b) => b.name === updatedBoard.name)
      const currentBoards = await orderData(index, boards, updatedBoard)

      await dispatch(setSingleBoard(updatedBoard as IBoardObjectProps));
      await dispatch(setBoards([...currentBoards] as IBoardObjectProps[]));
      setLoading(false);
      setShowColumnFormModal(false);
      renderSuccessMessage('Column saved successfully');
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
              title="Create Column"
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
