import boardsData from "../data/data.json";
import { IBoardObjectProps, IBoardObjectPropsResponse, ICreateBoardProps, IUpdateBoardProps } from "../interfaces/board";
import { checkNewDuplicate, checkExistingDuplicate, duplicatesInArry } from "../validation/input";
import { orderData, valueChanged, valuesChanged } from "../helper/utils";

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

export const throwErrorBoardError = (columns: {name: string, tasks: []}[], columnDuplicates: boolean, exitingBoardName: boolean) => {
  if (columns.length > 6) throw new Error('Board can only have 6 columns');
  if (columnDuplicates) throw new Error('Board column names must be unique');
  if (exitingBoardName) throw new Error('Board name already exists');

  return;
}

export const createBoard = async ({
  name,
  columns,
  boards
}: ICreateBoardProps): Promise<IBoardObjectProps> => {
  const existingBoardName = checkNewDuplicate(boards, name);
  const columnDuplicates = duplicatesInArry(columns);

  throwErrorBoardError(columns, columnDuplicates, existingBoardName);

  const newBoard = { name, columns };
  const newBoardsData = {boards: [...boards, newBoard]};
  await localStorage.setItem('boards', JSON.stringify(newBoardsData));

  return newBoard;
};

export const updateBoard = async ({
  board,
  name,
  columns,
  boards
}: IUpdateBoardProps): Promise<IBoardObjectPropsResponse<any>> => {
  const existingColumnNames = board.columns.map(col => col.name);
  const inputColumnNames = columns.map(col => col.name);

  const nameChanged = await valueChanged(board.name, name);
  const columnsChanged = await valuesChanged(existingColumnNames, inputColumnNames);
  const columnDuplicates = duplicatesInArry(columns);
  const existingBoardName = checkExistingDuplicate(boards, board.name, name);

  throwErrorBoardError(columns, columnDuplicates, existingBoardName);

  if (nameChanged || columnsChanged) {
    const boardColumnsUpdate = columns.map(column => {
      const existingColumn = board.columns.find(col => col.name === column.name);
      if (existingColumn) {
        return existingColumn
      } else {
        return {name: column.name, tasks: []}
      }
    });


    const updatedBoard = { name, columns: boardColumnsUpdate };
    const boardIndex = await boards.findIndex((b) => b.name === board.name);
    
    const currentBoards = await orderData(boardIndex, boards, updatedBoard)
    const updatedBoardsData = await {boards: [...currentBoards]};
    await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

    return {data: updatedBoard, message: 'Board updated successfully'};
  } else {
    return {data: {}, message: 'No data change detected'};
  }
};
