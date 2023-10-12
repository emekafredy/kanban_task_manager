import { FC } from "react";
import { Modal } from ".";
import { IConfirmDeleteModalProps } from "../../../interfaces/common";

export const ConfirmDeleteModal:FC<IConfirmDeleteModalProps> = ({
  title,
  bodyText,
  setShowModal,
  handleDelete,
  actionBtnLoading
}) => {
  return (
    <Modal
      title={title}
      setFooter={true}
      children={
        <p className="px-8 py-4 text-gray-200 text-m">
          {bodyText}
        </p>
      }
      setShowModal={setShowModal}
      actionTerm="Delete"
      performAction={handleDelete}
      actionBtnLoading={actionBtnLoading}
    />
  )
};
