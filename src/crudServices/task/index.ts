import { IBoardObjectProps, IBoardObjectPropsResponse } from "../../interfaces/board";
import {
  ICreateTaskProps,
  IUpdateTaskProps,
  TaskProps,
  SubtaskProps
} from "../../interfaces/task";
import { orderData, valueChanged, valuesChanged } from "../../helper/utils";
import { checkExistingDuplicate, checkNewDuplicate, duplicatesInArry } from "../../validation/input";
import { IColumnProps } from "../../interfaces/column";

const modifyBoardData = (board: IBoardObjectProps, newTask: TaskProps, status: string) => {
  let selectedColumn = board.columns.find(c => c.name === status) as IColumnProps;
  const columnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name);

  const duplicate = checkNewDuplicate(selectedColumn.tasks, newTask.title);
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
    if (st.title != '') {
      taskSubtasks.push(st);
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

export const throwErrorTaskError = (
  subtasks: {title: string, isCompleted: boolean}[],
  subtaskDuplicates: boolean,
  exitingTaskTitle: boolean
) => {
  if (subtasks.length > 10) throw new Error('Task can only have 10 sub-tasks');
  if (subtaskDuplicates) throw new Error('Sub tasks must be unique');
  if (exitingTaskTitle) throw new Error('Task title already exists for board');

  return;
}

export const fullyUpdateTask = async (
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

  throwErrorTaskError(subtasks, subtaskDuplicates, existingTaskName);

  const existingSubtaskTitles = task.subtasks.map(st => st.title);
  const inputSubtaskTitles = subtasks.map(st => st.title);

  const titleChanged = valueChanged(task.title, title);
  const descriptionChanged = valueChanged(task.description || '', description);
  const statusChanged = valueChanged(task.status || '', status);
  const subtasksChanged = valuesChanged(existingSubtaskTitles, inputSubtaskTitles);
  let updatedTask = task;
  let updatedBoard = {} as IBoardObjectProps;

  if (titleChanged || descriptionChanged || statusChanged || subtasksChanged) {
    const subtasksUpdate = subtasks.map(st => {
      const existingSubtask = task.subtasks.find(est => est.title === st.title);
      if (existingSubtask) {
        return existingSubtask
      } else {
        return {title: st.title, isCompleted: false}
      }
    });

    updatedTask = {
      ...task,
      title,
      description,
      subtasks: subtasksUpdate,
      status
    }
  };

  if (statusChanged) {
    let previousColumn = board.columns.find(c => c.name === column.name) as IColumnProps;
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

    updatedBoard = { name: board.name, columns: orderedColumnsII } as IBoardObjectProps;
  } else {
    const taskIndex = column.tasks.findIndex((t) => t.title === task.title)
    const orderedTasks = orderData(taskIndex, column.tasks, updatedTask);

    const selectedColumn = {
      ...column,
      tasks: [...orderedTasks]
    }
    const prevColumnIndex = board.columns.findIndex((c) => c.name === selectedColumn.name);
    const orderedColumns = orderData(prevColumnIndex, board.columns, selectedColumn);

    updatedBoard = { name: board.name, columns: orderedColumns } as IBoardObjectProps;
  }

  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const updatedBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...updatedBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return [updatedBoard, updatedTask];
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
  } else if (change === 'status') {
    updatedTask = await updateTaskStatus(task, status);
    updatedBoard = await modifyBoardDataForTaskStatusUpdate(board, updatedTask, prevStatus || '', updatedTask.status || '');
  }
  
  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const updatedBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...updatedBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return [updatedBoard, updatedTask];
};

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
  const boardIndex = await boards.findIndex((b) => b.name === board.name)
  const updatedBoards = await orderData(boardIndex, boards, updatedBoard)

  const updatedBoardsData = await {boards: [...updatedBoards]};
  await localStorage.setItem('boards', JSON.stringify(updatedBoardsData));

  return {
    data: {board: updatedBoard, boards: updatedBoards},
    message: 'Task deleted successfully'
  };
};
