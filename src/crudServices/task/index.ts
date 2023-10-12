import { IBoardObjectProps, IBoardObjectPropsResponse } from "../../interfaces/board";
import {
  ICreateTaskProps,
  IUpdateTaskProps,
  TaskProps,
  SubtaskProps
} from "../../interfaces/task";
import { orderData, valueChanged, valuesChanged } from "../../helper/utils";
import { checkExistingDuplicate, duplicatesInArry } from "../../validation/input";
import { IColumnProps } from "../../interfaces/column";
import {
  throwTaskError,
  modifyBoardData,
  modifyBoardDataForSubtaskUpdate,
  modifyBoardDataForTaskStatusUpdate,
  modifyBoardsData,
  updateSubTask,
  updateTaskStatus,
  getUpdatedTask,
  removeTaskFromPreviousColumn,
  addTaskToSelectedColumn,
  updateColumnsWithoutStatusChange
} from "./taskHelpers";
import { handleTaskTitleDuplicateError } from "../../validation/errorHandlers";

export const createTask = async ({
  title,
  description,
  subtasks,
  status,
  board,
  boards
}: ICreateTaskProps): Promise<IBoardObjectProps> => {
  const taskSubtasks: SubtaskProps[] = [];
  subtasks?.map(st => {
    if (st.title != '') taskSubtasks.push(st);
  });

  const newTask = {
    title, description, status, subtasks: taskSubtasks
  }

  let newTaskColumn = board.columns.find(c => c.name === status) as IColumnProps;
  handleTaskTitleDuplicateError(newTask, newTaskColumn)

  const columnIndex = board.columns.findIndex((c) => c.name === newTaskColumn.name);

  const updatedBoard = await modifyBoardData(board, newTask, newTaskColumn, columnIndex);
  const { result } = await modifyBoardsData(board, boards, updatedBoard);

  return result;
};

export const patchTask = async ({
  board,
  boards,
  change,
  subtask,
  task,
  status,
  prevStatus
}: IUpdateTaskProps): Promise<[IBoardObjectProps, TaskProps]> => {
  let updatedTask = {} as TaskProps;
  let updatedBoard = {} as IBoardObjectProps;

  if (change === 'subtask') {
    updatedTask = await updateSubTask(task, subtask)
    updatedBoard = await modifyBoardDataForSubtaskUpdate(board, updatedTask, updatedTask.status || '');
  } else if (change === 'status') {
    updatedTask = await updateTaskStatus(task, status);
    updatedBoard = await modifyBoardDataForTaskStatusUpdate(board, updatedTask, prevStatus || '', updatedTask.status || '');
  }

  const { result } = await modifyBoardsData(board, boards, updatedBoard);

  return [result, updatedTask];
};

export const updateTask = async (
  board: IBoardObjectProps,
  column: IColumnProps,
  task: TaskProps,
  title: string,
  description: string,
  subtasks: SubtaskProps[],
  status: string,
  boards: IBoardObjectProps[]
): Promise<[IBoardObjectProps, TaskProps]> =>  {
  const existingTaskName = checkExistingDuplicate(column.tasks, task.title, title);
  const subtaskDuplicates = duplicatesInArry(subtasks);

  throwTaskError(subtasks, subtaskDuplicates, existingTaskName);

  const existingSubtaskTitles = task.subtasks.map(st => st.title);
  const inputSubtaskTitles = subtasks.map(st => st.title);

  const titleChanged = valueChanged(task.title, title);
  const descriptionChanged = valueChanged(task.description || '', description);
  const statusChanged = valueChanged(task.status || '', status);
  const subtasksChanged = valuesChanged(existingSubtaskTitles, inputSubtaskTitles);

  let updatedTask = task;
  let updatedBoard = {} as IBoardObjectProps;

  if (titleChanged || descriptionChanged || statusChanged || subtasksChanged) {
    updatedTask = getUpdatedTask(subtasks, task, title, description, status)
  };

  if (statusChanged) {
    const orderedColumns = removeTaskFromPreviousColumn(board, updatedTask, column.name)
    const orderedColumnsII = addTaskToSelectedColumn(board, status, updatedTask, orderedColumns)

    updatedBoard = { name: board.name, columns: orderedColumnsII } as IBoardObjectProps;
  } else {
    const orderedColumns = updateColumnsWithoutStatusChange(column, task, updatedTask, board);

    updatedBoard = { name: board.name, columns: orderedColumns } as IBoardObjectProps;
  }

  const { result } = await modifyBoardsData(board, boards, updatedBoard)

  return [result, updatedTask];
}

export const deleteTask = async (
  column: IColumnProps,
  task: TaskProps,
  board: IBoardObjectProps,
  boards: IBoardObjectProps[]
): Promise<IBoardObjectPropsResponse<any>> => {
  const filteredTasks = column.tasks.filter(t => t.title !== task.title);

  const updatedColumn = { ...column, tasks: [...filteredTasks]}
  const columnIndex = await board.columns.findIndex((c) => c.name === column.name);

  const updatedBoardColumns = await orderData(columnIndex, board.columns, updatedColumn);

  const updatedBoard = {...board, columns: updatedBoardColumns};

  const { result, updatedBoards } = await modifyBoardsData(board, boards, updatedBoard);

  return {
    data: {board: result, boards: updatedBoards},
    message: 'Task deleted successfully'
  };
};
