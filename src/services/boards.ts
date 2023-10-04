import boardsData from "../data/data.json";
import { IBoardObjectProps } from "../interfaces/board";

export const getBoards = async (): Promise<IBoardObjectProps[]> => {
  if (!localStorage.boards || JSON.parse(localStorage.boards).length === 0) {
    await localStorage.setItem('boards', JSON.stringify(boardsData));
    const newData = await JSON.parse(localStorage.boards);
    return newData;
  }

  const data = await JSON.parse(localStorage.boards);
  return data.boards || [];
};
