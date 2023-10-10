import { IBoardObjectProps } from "../interfaces/board";
import {
  ICreateTaskProps,
  IColumnProps,
  IUpdateTaskProps,
  TaskProps,
  SubtaskProps
} from "../interfaces/task";
import { orderData } from "../helper/utils";
import { checkDuplicate } from "../validation/input";

const modifyBoardData = (board: IBoardObjectProps, newTask: TaskProps, status: string) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  const columnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name);

  const duplicate = checkDuplicate(selectedColumn.tasks, newTask.title);
  if (duplicate) {
    throw new Error('Task name already exists for column: ' + selectedColumn.name);
  }
  
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


const modifyBoardDataForSubtaskUpdate = (board: IBoardObjectProps, updatedTask: TaskProps, status: string) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  const columnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name)

  const taskIndex = selectedColumn.tasks.findIndex((t) => t.title === updatedTask.title);
  const orderedTasks = orderData(taskIndex, selectedColumn.tasks, updatedTask)
  
  selectedColumn = {
    name: selectedColumn.name,
    tasks: [...orderedTasks]
  }
  const orderedColumn = orderData(columnIndex, board.columns, selectedColumn)

  const updatedBoard = { name: board.name, columns: orderedColumn } as IBoardObjectProps;
  return updatedBoard;
};

const modifyBoardDataForTaskStatusUpdate = (board: IBoardObjectProps, updatedTask: TaskProps, prevStatus: string, status: string) => {
  let previousColumn = board.columns.find(c => c.name === prevStatus) as IColumnProps;
  const filteredTasks = previousColumn.tasks.filter((t) => t.title !== updatedTask.title);
  previousColumn = {
    ...previousColumn,
    tasks: [...filteredTasks]
  }
  const prevColumnIndex = board.columns.findIndex((c) => c.name === previousColumn.name)
  const orderedColumns = orderData(prevColumnIndex, board.columns, previousColumn)

  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  selectedColumn = {
    ...selectedColumn,
    tasks: [updatedTask, ...selectedColumn.tasks]
  }
  const selectedColumnIndex = orderedColumns.findIndex((c) => c.name === selectedColumn.name)
  const orderedColumnsII = orderData(selectedColumnIndex, orderedColumns, selectedColumn)


  const updatedBoard = { name: board.name, columns: orderedColumnsII } as IBoardObjectProps;
  return updatedBoard;
};

const updateSubTask = (
  task: TaskProps,
  subtask?: SubtaskProps
) => {
  const updatedSubTask = {...subtask, isCompleted: !(subtask?.isCompleted)};

  const subtaskIndex = task.subtasks.findIndex((st) => st.title === updatedSubTask.title);
  const orderedSubtasks = orderData(subtaskIndex, task.subtasks, updatedSubTask)

  return {...task, subtasks: orderedSubtasks}
}

const updateTaskStatus = (
  task: TaskProps,
  status: string
) => {
  return {...task, status}
}

export const updateTask = async ({
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
  } else {
    updatedTask = await updateTaskStatus(task, status);
    updatedBoard = await modifyBoardDataForTaskStatusUpdate(board, updatedTask, prevStatus || '', updatedTask.status || '');
  }
  
  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const updatedBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...updatedBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return [updatedBoard, updatedTask];
};
