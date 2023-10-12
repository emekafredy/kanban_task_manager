import {checkNewDuplicate} from './input';
import { IBoardObjectProps } from '../interfaces/board';
import { IColumnProps } from '../interfaces/column';
import { TaskProps } from '../interfaces/task';

export const handleTaskTitleDuplicateError = (
  newTask: TaskProps,
  newTaskColumn: IColumnProps
) => {
  const duplicateTask = checkNewDuplicate(newTaskColumn.tasks, newTask.title);

  if (duplicateTask) {
    throw new Error('Task name already exists for column: ' + newTaskColumn.name);
  }
};
