import boardsData from "../../data/data.json";
import { IBoardObjectProps, IBoardObjectPropsResponse, ICreateBoardProps, IUpdateBoardProps } from "../../interfaces/board";
import { checkNewDuplicate, checkExistingDuplicate, duplicatesInArry } from "../../validation/input";
import { orderData, valueChanged, valuesChanged } from "../../helper/utils";
import { throwBoardError } from "./boardHelpers";

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
  const existingBoardName = checkNewDuplicate(boards, name);
  const columnDuplicates = duplicatesInArry(columns);

  throwBoardError(columns, columnDuplicates, existingBoardName);

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

  const columnDuplicates = duplicatesInArry(columns);
  const existingBoardName = checkExistingDuplicate(boards, board.name, name);
  
  throwBoardError(columns, columnDuplicates, existingBoardName);

  const nameChanged = await valueChanged(board.name, name);
  const columnsChanged = await valuesChanged(existingColumnNames, inputColumnNames);

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


export const deleteBoard = async (
  board: IBoardObjectProps,
  boards: IBoardObjectProps[]
): Promise<IBoardObjectPropsResponse<any>> => {
    
  const filteredBoards = await boards.filter((b) => b.name !== board.name);
  const updatedBoardsData = await {boards: [...filteredBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return { data: filteredBoards, message: 'Board deleted successfully'};
};
