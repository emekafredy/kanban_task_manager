import { IBoardObjectProps } from "../interfaces/board";
import { ICreateTaskProps, IColumnProps } from "../interfaces/task";
import { orderData } from "../helper/utils";

const modifyBoardData = (board: IBoardObjectProps, newTask: any, status: string) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;

  const columnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name)
  
  selectedColumn = {
    name: selectedColumn.name,
    tasks: [...selectedColumn.tasks, newTask]
  }
  const orderedColumn = orderData(columnIndex, board.columns, selectedColumn)

  const updatedBoard = { name: board.name, columns: orderedColumn } as IBoardObjectProps;
  return updatedBoard;
};

export const createTask = async ({
  title,
  description,
  subtasks,
  status,
  board,
  boards
}: ICreateTaskProps): Promise<IBoardObjectProps> => {
  const taskSubtasks: {title: string; isCompleted: boolean}[] = [];
  subtasks?.map(st => {
    if (st != '') {
      taskSubtasks.push({
        title: st,
        isCompleted: false
      });
    }
  });

  const newTask = {
    title,
    description,
    status,
    subtasks: taskSubtasks
  }

  const updatedBoard = await modifyBoardData(board, newTask, status)
  
  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const currentBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...currentBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return updatedBoard;
};
