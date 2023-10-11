import { useSelector } from "react-redux";

import { getAllBoardsState } from "../../store/slices/board";
import { NoColumn } from "./NoColumn";
import { BoardData } from "./BoardData";

export const Board = () => {
  const { boards, board } = useSelector(getAllBoardsState);
  const selectedBoard = board || boards[0];

  return (
    <>
    {selectedBoard?.columns.length > 0 ? (
      <BoardData board={selectedBoard} />
    ) : (
      <NoColumn />
    )}
    </>
  );
}
