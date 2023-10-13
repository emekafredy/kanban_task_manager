import { useState } from "react";
import { AddSVG, } from "../../components/Common/SVG/AddSVG";
import { BoardFormModal } from "../../components/Board/BoardFormModal";
import { Button } from "../../components/Common/Forms/Button";

export const NoBoard = () => {
  const [showNewBoardFormModal, setShowNewBoardFormModal] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center overflow-auto bg-silver-100 dark:bg-black-300 h-screen">
      <div className="text-center">
        <h4 className="text-l font-semibold text-gray-200 mb-4">
          You have no board yet. Create a new board to get started.
        </h4>
        <Button
          primary
          buttonType="button"
          roundedBG
          large
          title={
            <span className="tablet:inline text-s ml-1">
              Create New Board
            </span>
          }
          handleClick={() => setShowNewBoardFormModal(true)}
          extraClasses="px-5"
          hasIcon
          leftIcon={<AddSVG color={"#FFFFFF"}/>}
        />
      </div>

      {showNewBoardFormModal && (
        <BoardFormModal setShowModal={setShowNewBoardFormModal} />
      )}
    </div>
  )
};
