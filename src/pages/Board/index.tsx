import { FC } from "react";
import { useSelector } from "react-redux";

import { getAllBoardsState } from "../../store/slices/board";
import { BoardColumn } from "../../components/BoardColumn";
import { AddSVG } from "../../components/common/SVG/AddSVG";

export const Board:FC = () => {
  const { boards, board } = useSelector(getAllBoardsState);
  const selectedBoard = board || boards[0]

  return (
    <div className="flex flex-nowrap overflow-auto bg-silver-100 dark:bg-black-300 h-screen">
      {
        selectedBoard?.columns?.map((column, i) => {
          return (
            <div
              key={i}
              className="mx-4 my-8"
            >
              <BoardColumn column={column} />
            </div>
          )
        })
      }
      <div className="mx-4 mt-12 mb-48">
        <div
          className="block p-4 bg-silver-200 text-center rounded hover:cursor-pointer dark:bg-black-200 w-[300px] h-full my-4"
          style={{ backgroundColor: 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)'}}
        >
          <button
            type="button"
            className="text-gray bg-silver-200 dark:bg-black-200 text-xl rounded-full px-5 py-2 
              inline-flex justify-center items-center font-extrabold mr-4">
                <AddSVG color={"#828FA3"} />
                <p>
                  <span className="tablet:inline sm-mobile:hidden font-bold ml-1 mt-44 leading-6">New Column</span>
                </p>
          </button>
        </div>
      </div>
    </div>
  );
}
