import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getAllBoardsState } from "../../store/slices/board";
import { BoardColumn } from "../../components/BoardColumn";

export const Board:FC = () => {
  const { boards } = useSelector(getAllBoardsState);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [defaultBoard, setDefaultBoard] = useState<string>(boards[0]?.name);
  
  useEffect(() => {
    setDefaultBoard(boards[0]?.name);
    setSearchParams({ board: boards[0]?.name })
  }, [boards])
  
  const boardTitle = searchParams.get('board') || defaultBoard;
  const selectedBoard = boards?.find(board => board.name === boardTitle);

  return (
    <div className="flex flex-nowrap p-4">
      {selectedBoard?.columns?.map((column, i) => {
        return (
          <div
            key={i}
            className="mx-4 my-8"
          >
            <BoardColumn column={column} />
          </div>
        )
      })}
    </div>
  );
}
