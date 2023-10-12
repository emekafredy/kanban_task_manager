import { useState } from "react";
import { useSelector } from "react-redux";
import { AddSVG } from "../Common/SVG/AddSVG";
import Elipses from "../../assets/icons/icon-vertical-ellipsis.svg";
import { getThemeState } from "../../store/slices/theme";
import { MobileTopLeftNav } from "./MobileTopLeftNav";
import { TopLeftNav } from "./TopLeftNav";
import { Loader } from "../Common/Loader";
import { useTheme } from "../../hooks/useTheme";

import { getAllBoardsState } from "../../store/slices/board";
import { useFetchBoards } from "../../hooks/useFetchBoards";
import { TaskFormModal } from "../Task/TaskFormModal";
import { BoardFormModal } from "../Board/BoardFormModal";
import { DeleteBoardModal } from "../Board/DeleteBoardModal";
import { OptionsMenu } from "../Common/OptionsMenu";

export const TopNav = ({
  sideBarVisible,
}: {
  sideBarVisible: boolean
}) => {
  const [showAddNewTaskFormModal, setshowAddNewTaskFormModal] = useState<boolean>(false);
  const [showBoardMenu, setShowBoardMenu] = useState<boolean>(false);
  const [showEditBoardFormModal, setShowEditBoardFormModal] = useState<boolean>(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState<boolean>(false);

  const { loading } = useFetchBoards();
  useTheme();
  const { colorTheme } = useSelector(getThemeState);
  const { boardName, boards, board } = useSelector(getAllBoardsState);
  const selectedBoard = board || boards[0];

  return (
    <>
      <nav className="
        sticky
        top-0
        z-10
        bg-white
        dark:bg-black-200
        border-b-2
        border-silver-200
        dark:border-black-100"
      >
        {loading ? (
          <Loader color="#828FA3" />
        ) : (
          <>
            <div className="flex justify-between">
              <MobileTopLeftNav title={board?.name || boardName || boards[0]?.name}/>
              <TopLeftNav
                colorTheme={colorTheme}
                sideBarVisible={sideBarVisible}
                title={boardName || boards[0]?.name}
              />

              <div className="flex items-center p-4">
                <button
                  type="button"
                  className="text-white bg-purple-200 rounded-full px-5 py-3 
                    inline-flex items-center font-extrabold mr-4 disabled:opacity-50"
                  disabled={selectedBoard && selectedBoard?.columns.length === 0}
                  onClick={() => setshowAddNewTaskFormModal(true)}
                >
                  <AddSVG color={"#FFFFFF"}/>
                  <span className="tablet:inline sm-mobile:hidden text-s ml-1">Add New Task</span>
                </button>

                <img
                  src={Elipses}
                  className="h-5 cursor-pointer mr-4 ml-2"
                  alt="board-options"
                  onClick={() => setShowBoardMenu(!showBoardMenu)}
                />
              </div>
            </div>
            {showBoardMenu && (
              <OptionsMenu
                editText="Edit Board"
                deleteText="Delete Board"
                setShowEditModal={setShowEditBoardFormModal}
                setShowDeleteModal={setShowDeleteBoardModal}
                setShowPrevModal={setShowBoardMenu}
                board
              />
            )}
          </>
        )}
      </nav>
      {showAddNewTaskFormModal && (
        <TaskFormModal setShowModal={setshowAddNewTaskFormModal} />
      )}

      {showEditBoardFormModal && (
        <BoardFormModal setShowModal={setShowEditBoardFormModal} mode="update"/>
      )}

      {showDeleteBoardModal && (
        <DeleteBoardModal setShowModal={setShowDeleteBoardModal} />
      )}
    </>
  )
};
