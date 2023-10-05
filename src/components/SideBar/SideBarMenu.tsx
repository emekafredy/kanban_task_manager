import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { BoardSVG } from "../common/SVG/BoardSVG";
import { AddSVG } from "../common/SVG/AddSVG";

import { getAllBoardsState } from "../../store/slices/board";
import { useFetchSingleBoard } from "../../hooks/useFetchSingleBoard";

export const SideBarMenu:FC = () => {
  const { boards, boardName } = useSelector(getAllBoardsState);
  const [_, setSearchParams] = useSearchParams();
  const { setBoardTitle } = useFetchSingleBoard();
  
  const [activeBoard, setActiveBoard] = useState<string>(boardName || boards[0]?.name);

  const handleSelectBoard = (title: string) => {
    setActiveBoard(title);
    setSearchParams({ board: title })
    setBoardTitle(title)
  }

  return (
    <div className="mt-4 overflow-auto">
      <p className="ml-10 text-s font-bold tracking-wide text-gray">
        ALL BOARDS {`(${boards.length})`}
      </p>

      <ul className="mt-6">
        {boards?.map((board, index) => {
          return (
            <li
            key={index}
            className={`
              flex py-4 hover:cursor-pointer text-gray text-m items-center
              gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300
              ${board.name === activeBoard ? 'text-white bg-purple-200 px-4 rounded-r-full' : ''}
            `}
            onClick={() => handleSelectBoard(board.name)}
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
            flex py-4 cursor-pointer text-gray text-m items-center
            gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300`}
        >
          <BoardSVG color={"#635FC7"}/>
          <AddSVG color={"#635FC7"}/>
          <span className="ml-[-12px] text-purple-200 flex">
            Create New Board
          </span>
        </li>
      </ul>
    </div>
  )
};
