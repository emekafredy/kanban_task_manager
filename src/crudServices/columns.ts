import { IBoardObjectProps } from "../interfaces/board";
import { orderData } from "../helper/utils";
import { checkDuplicate } from "../validation/input";

interface ICreateColumnProps {
  name: string;
  board: IBoardObjectProps;
  boards: IBoardObjectProps[];
}

export const createColumn = async ({
  name,
  board,
  boards
}: ICreateColumnProps): Promise<IBoardObjectProps> => {
  const newColumn = {
    name,
    tasks: []
  }

  const duplicate = checkDuplicate(board.columns, name);
  if (duplicate) {
    throw new Error('Column already exists for board: ' + board.name);
  }

  const boardColumns = [...board.columns, newColumn]
  const updatedBoard = {...board, columns: boardColumns };
  const boardIndex = await boards.findIndex((b) => b.name === updatedBoard.name)

  const currentBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...currentBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return updatedBoard;
};
