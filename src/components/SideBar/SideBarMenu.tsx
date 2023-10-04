import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { BoardSVG } from "../common/SVG/BoardSVG";
import { AddSVG } from "../common/SVG/AddSVG";
import { Loader } from "../common/Loader";

import { useFetchBoards } from "../../hooks/useFetchBoards";
import { getAllBoardsState } from "../../store/slices/board";

export const SideBarMenu:FC = () => {
  const { loading } = useFetchBoards();
  const { boards } = useSelector(getAllBoardsState);
  const [, setSearchParams] = useSearchParams();
  
  const [activeBoard, setActiveBoard] = useState<string>(boards[0]?.name);
  
  useEffect(() => {
    setActiveBoard(boards[0]?.name)
  }, [boards])

  const handleSelectBoard = (title: string) => {
    setActiveBoard(title);
    setSearchParams({ board: title })
  }

  return (
    <div className="mt-4 overflow-auto">
      {loading ? (
        <Loader color="#828FA3" />
      ) : (
        <>
          <p className="ml-10 text-m font-bold leading-15 tracking-wide text-gray"> ALL BOARDS {`(${boards.length})`}</p>
          <ul className="mt-6">
            {boards?.map((board, index) => (
              <li
                key={index}
                className={`
                  flex py-4 hover:cursor-pointer text-gray text-sm items-center
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
            ))}

            <li
              className={`
                flex py-4 cursor-pointer text-gray text-sm items-center
                gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300`}
            >
              <BoardSVG color={"#635FC7"}/>
              <AddSVG color={"#635FC7"}/>
              <span className="ml-[-15px] text-purple-200 flex">
                Create New Board
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  )
};
