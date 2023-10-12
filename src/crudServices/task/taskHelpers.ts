import { orderData } from "../../helper/utils";
import { IBoardObjectProps } from "../../interfaces/board";
import { IColumnProps } from "../../interfaces/column";
import { TaskProps, SubtaskProps } from "../../interfaces/task";

export const throwTaskError = (
  subtasks: {title: string, isCompleted: boolean}[],
  subtaskDuplicates: boolean,
  exitingTaskTitle: boolean
) => {
  if (subtasks.length > 10) throw new Error('Task can only have 10 sub-tasks');
  if (subtaskDuplicates) throw new Error('Sub tasks must be unique');
  if (exitingTaskTitle) throw new Error('Task title already exists for board');

  return;
}

export const modifyTaskData = async (
  board: IBoardObjectProps,
  status: string,
  updatedTask: TaskProps,
) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  const columnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name)

  const taskIndex = selectedColumn.tasks.findIndex((t) => t.title === updatedTask.title);
  const orderedTasks = orderData(taskIndex, selectedColumn.tasks, updatedTask);

  return {
    selectedColumn, columnIndex, orderedTasks
  }
}

export const modifyColumnData = async (
  board: IBoardObjectProps,
  selectedColumn: IColumnProps,
  columnIndex: number,
  tasks: TaskProps[],
) => {

  const updatedColumn = {
    name: selectedColumn.name,
    tasks: tasks
  }
  const orderedColumn = orderData(columnIndex, board.columns, updatedColumn)
  return orderedColumn;
}

export const modifyBoardData = async (
  board: IBoardObjectProps,
  newTask: TaskProps,
  newTaskColumn: IColumnProps,
  columnIndex: number
) => {
  const orderedTasks = [...newTaskColumn.tasks, newTask];
  const orderedColumn = await modifyColumnData(board, newTaskColumn, columnIndex, orderedTasks);

  const updatedBoard = { name: board.name, columns: orderedColumn } as IBoardObjectProps;
  return updatedBoard;
};

export const modifyBoardsData = async (
  board: IBoardObjectProps,
  boards: IBoardObjectProps[],
  updatedBoard: IBoardObjectProps
) => {
  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const updatedBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = {boards: [...updatedBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return { result: updatedBoard, updatedBoards };
}


export const modifyBoardDataForSubtaskUpdate =  async (
  board: IBoardObjectProps,
  updatedTask: TaskProps, 
  status: string
) => {
  const {
    selectedColumn, columnIndex, orderedTasks
  } = await modifyTaskData(board, status, updatedTask);

  const orderedColumn = await modifyColumnData(board, selectedColumn, columnIndex, orderedTasks);
  const updatedBoard = { name: board.name, columns: orderedColumn } as IBoardObjectProps;

  return updatedBoard;
};

export const removeTaskFromPreviousColumn = (
  board: IBoardObjectProps,
  updatedTask: TaskProps,
  prevStatus: string,
) => {
  let previousColumn = board.columns.find(c => c.name === prevStatus) as IColumnProps;
  const filteredTasks = previousColumn.tasks.filter((t) => t.title !== updatedTask.title);
  previousColumn = {
    ...previousColumn,
    tasks: [...filteredTasks]
  }
  const prevColumnIndex = board.columns.findIndex((c) => c.name === previousColumn.name)
  const orderedColumns = orderData(prevColumnIndex, board.columns, previousColumn)

  return orderedColumns;
};

export const addTaskToSelectedColumn = (
  board: IBoardObjectProps,
  status: string,
  updatedTask: TaskProps,
  columns: IColumnProps[],
) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  selectedColumn = {
    ...selectedColumn,
    tasks: [updatedTask, ...selectedColumn.tasks]
  }
  const selectedColumnIndex = columns.findIndex((c) => c.name === selectedColumn.name)
  const orderedColumns = orderData(selectedColumnIndex, columns, selectedColumn);

  return orderedColumns;
};

export const modifyBoardDataForTaskStatusUpdate = (
  board: IBoardObjectProps,
  updatedTask: TaskProps,
  prevStatus: string,
  status: string
) => {
  const orderedColumns = removeTaskFromPreviousColumn(board, updatedTask, prevStatus);
  const orderedColumnsII = addTaskToSelectedColumn(board, status, updatedTask, orderedColumns);

  const updatedBoard = { name: board.name, columns: orderedColumnsII } as IBoardObjectProps;
  return updatedBoard;
};

export const updateSubTask = (
  task: TaskProps,
  subtask?: SubtaskProps
) => {
  const updatedSubTask = {...subtask, isCompleted: !(subtask?.isCompleted)};

  const subtaskIndex = task.subtasks.findIndex((st) => st.title === updatedSubTask.title);
  const orderedSubtasks = orderData(subtaskIndex, task.subtasks, updatedSubTask)

  return {...task, subtasks: orderedSubtasks}
}

export const updateTaskStatus = (
  task: TaskProps,
  status: string
) => {
  return {...task, status}
}

export const getUpdatedTask = (
  subtasks: SubtaskProps[],
  task: TaskProps,
  title: string,
  description: string,
  status: string,
) => {
  const subtasksUpdate = subtasks.map(st => {
    const existingSubtask = task.subtasks.find(est => est.title === st.title);
    if (existingSubtask) {
      return existingSubtask
    } else {
      return {title: st.title, isCompleted: false}
    }
  });

  const updatedTask = {
    ...task,
    title,
    description,
    subtasks: subtasksUpdate,
    status
  }

  return updatedTask;
}

export const updateColumnsWithoutStatusChange = (
  column: IColumnProps,
  task: TaskProps,
  updatedTask: TaskProps,
  board: IBoardObjectProps,
) => {
  const taskIndex = column.tasks.findIndex((t) => t.title === task.title)
  const orderedTasks = orderData(taskIndex, column.tasks, updatedTask);

  const selectedColumn = {
    ...column,
    tasks: [...orderedTasks]
  }
  const prevColumnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name);
  const orderedColumns = orderData(prevColumnIndex, board.columns, selectedColumn);

  return orderedColumns;
}