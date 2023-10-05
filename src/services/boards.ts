import boardsData from "../data/data.json";
import { IBoardObjectProps } from "../interfaces/board";

export const getBoards = async (): Promise<IBoardObjectProps[]> => {
  if (!localStorage.boards || JSON.parse(localStorage.boards).length === 0) {
    await localStorage.setItem('boards', JSON.stringify(boardsData));
    const result = await JSON.parse(localStorage.boards);
    return result;
  }

  const data = await JSON.parse(localStorage.boards);
  return data.boards || [];
};

export const getSingleBoard = async (boardName: string | null | undefined): Promise<IBoardObjectProps> => {
    const boards = await JSON.parse(localStorage.boards);
    const title = boardName || boards[0]?.name;
    const result = await boards?.boards?.find((board: IBoardObjectProps) => board.name === title) as IBoardObjectProps;
    return result;
};
