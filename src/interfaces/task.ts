import { IBoardObjectProps } from "./board";

export interface ICreateTaskProps {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
  board: IBoardObjectProps;
  boards: IBoardObjectProps[]
}

export interface IColumnProps {
  name: string;
  tasks: {
    title: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[]
  }[],
};
