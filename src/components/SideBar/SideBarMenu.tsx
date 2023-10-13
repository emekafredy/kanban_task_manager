import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { BoardSVG } from "../Common/SVG/BoardSVG";
import { AddSVG } from "../Common/SVG/AddSVG";
import { getAllBoardsState } from "../../store/slices/board";
import { useFetchSingleBoard } from "../../hooks/useFetchSingleBoard";
import { Button } from "../Common/Forms/Button";

export const SideBarMenu = ({
  setShowModal
}: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const { boards } = useSelector(getAllBoardsState);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setBoardTitle } = useFetchSingleBoard();
  const boardOnURL = searchParams.get("board")
  
  const [activeBoard, setActiveBoard] = useState<string>(boardOnURL || boards[0]?.name);

  const handleSelectBoard = () => {
    setSearchParams({ board: activeBoard })
    setBoardTitle(activeBoard)
  }

  useEffect(() => {
    if (activeBoard) handleSelectBoard()
  }, [activeBoard])

  return (
    <div className="mt-4 max-h-[400px] overflow-auto">
      {boards?.length === 0 ? (
        <div className="text-center">
          <h4 className="text-l font-semibold text-gray-200 mb-4">
            You have no board yet
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
            handleClick={() => setShowModal(true)}
            px="5"
            hasIcon
            leftIcon={<AddSVG color={"#FFFFFF"}/>}
          />
        </div>
      ) : (
        <>
          <p className="ml-10 text-s font-bold tracking-wide text-gray-200">
            ALL BOARDS {`(${boards.length})`}
          </p>

          <ul className="mt-6">
            {boards?.map((board, index) => {
              return (
                <li
                key={index}
                className={`
                  flex py-4 hover:cursor-pointer text-gray-200 text-m items-center
                  gap-x-4 font-bold pl-10 mr-6 ease-in-out transition duration-500
                  ${board.name !== activeBoard ? 'hover:bg-silver-200 hover:rounded-r-full hover:text-purple-200' : ''}
                  ${board.name === activeBoard ? 'text-white bg-purple-200 px-4 rounded-r-full' : ''}
                `}
                onClick={() => setActiveBoard(board.name)}
              >
                <BoardSVG color={board.name === activeBoard ? "#FFFFFF" : "#828FA3"}/>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {board.name}
                </span>
              </li>
              )
            })}

            <li
              className={`
                flex py-4 cursor-pointer text-gray-200 text-m items-center
                gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300`}
                onClick={() => setShowModal(true)}
            >
              <BoardSVG color={"#635FC7"} />
              <AddSVG color={"#635FC7"} />
              <span className="ml-[-12px] text-purple-200 hover:text-purple-100 transition duration-300 flex">
                Create New Board
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  )
};
