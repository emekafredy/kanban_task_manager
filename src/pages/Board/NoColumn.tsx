import { useState } from "react";
import { AddSVG, } from "../../components/Common/SVG/AddSVG";
import { BoardFormModal } from "../../components/BoardFormModal";

export const NoColumn = () => {
  const [showEditBoardFormModal, setShowEditBoardFormModal] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center overflow-auto bg-silver-100 dark:bg-black-300 h-screen">
      <div className="text-center">
        <h4 className="text-l font-semibold text-gray-200 mb-4">
          This board is empty. Create a new column to get started.
        </h4>
        <button
          type="button"
          className="text-white bg-purple-200 rounded-full px-5 py-3 
            inline-flex items-center font-extrabold mr-4"
          onClick={() => setShowEditBoardFormModal(true)}
        >
          <AddSVG color={"#FFFFFF"} />
          <span className="tablet:inline sm-mobile:hidden text-s ml-1">Add New Column</span>
        </button>
      </div>

      {showEditBoardFormModal && (
        <BoardFormModal setShowModal={setShowEditBoardFormModal} mode="update"/>
      )}
    </div>
  )
};
