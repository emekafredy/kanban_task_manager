import { useState } from "react";
import { AddSVG, } from "../../components/Common/SVG/AddSVG";
import { BoardFormModal } from "../../components/Board/BoardFormModal";
import { Button } from "../../components/Common/Forms/Button";

export const NoColumn = () => {
  const [showEditBoardFormModal, setShowEditBoardFormModal] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center overflow-auto bg-silver-100 dark:bg-black-300 h-screen">
      <div className="text-center">
        <h4 className="text-l font-semibold text-gray-200 mb-4">
          This board is empty. Create a new column to get started.
        </h4>
        <Button
          primary
          buttonType="button"
          roundedBG
          large
          title={
            <span className="tablet:inline text-s ml-1">
              Add New Column
            </span>
          }
          handleClick={() => setShowEditBoardFormModal(true)}
          px="5"
          hasIcon
          leftIcon={<AddSVG color={"#FFFFFF"}/>}
        />
      </div>

      {showEditBoardFormModal && (
        <BoardFormModal setShowModal={setShowEditBoardFormModal} mode="update"/>
      )}
    </div>
  )
};
