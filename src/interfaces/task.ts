import { IBoardObjectProps } from "./board";
import { IColumnProps } from "./column";

export interface SubtaskProps {
  title: string;
  isCompleted: boolean
}

export interface TaskProps {
  id?: string;
  title: string;
  description?: string;
  subtasks: SubtaskProps[];
  status?: string;
}

export interface ICreateTaskProps {
  title: string;
  description: string;
  subtasks?: SubtaskProps[];
  status: string;
  board: IBoardObjectProps;
  boards: IBoardObjectProps[]
}

export interface ITaskCardProps {
  task: TaskProps;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITaskDetailsModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUpdateTaskProps {
  board: IBoardObjectProps;
  boards: IBoardObjectProps[];
  change: string;
  subtask?: SubtaskProps;
  task: TaskProps;
  status: string;
  prevStatus?: string;
  column?: IColumnProps;
  title?: string;
  description?: string;
  subtasks?: SubtaskProps[]
}

export interface ITaskInfoProps {
  task: TaskProps;
  handleTaskUpdate: (
    change: string,
    status: string,
    subtask?: SubtaskProps
  ) => void;
}

export interface ISubtaskCheckBoxProps {
  id: number;
  subtask: SubtaskProps;
  handleTaskUpdate: (
    change: string,
    status: string,
    subtask?: SubtaskProps
  ) => void;
}
