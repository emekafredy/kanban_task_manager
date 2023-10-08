import boardsData from "../data/data.json";
import { IBoardObjectProps } from "../interfaces/board";

interface ICreateBoardProps {
  name: string;
  columns: string[];
  boards: IBoardObjectProps[]
}

export const getBoards = async (): Promise<IBoardObjectProps[]> => {
  if (!localStorage.boards || JSON.parse(localStorage.boards).length === 0) {
    await localStorage.setItem('boards', JSON.stringify(boardsData));
    const result = await JSON.parse(localStorage.boards).boards;
    return result;
  }

  const data = await JSON.parse(localStorage.boards).boards;
  return data;
};

export const getSingleBoard = async (boardName: string | null | undefined): Promise<IBoardObjectProps> => {
    const boards = await JSON.parse(localStorage.boards);
    const title = boardName || boards[0]?.name;
    const result = await boards?.boards?.find((board: IBoardObjectProps) => board.name === title) as IBoardObjectProps;
    return result;
};

export const createBoard = async ({
  name,
  columns,
  boards
}: ICreateBoardProps): Promise<IBoardObjectProps> => {
  const boardColumns = columns.map(column => {
    return {
      name: column,
      tasks: []
    }
  })

  const newBoard = { name, columns: boardColumns };
  const newBoardsData = {boards: [...boards, newBoard]};
  await localStorage.setItem('boards', JSON.stringify(newBoardsData));

  return newBoard;
};
