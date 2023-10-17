import { IColumnProps } from "./column";
import { TaskProps } from "./task";

export interface IBoardObjectPropsResponse<T> {
  data?: T;
  message: string;
}

export interface IBoardObjectProps {
  name: string;
  columns: IColumnProps[];
}

export interface IBoardColumnProps {
  column: {
    name: string;
    tasks: TaskProps[],
  };
};

export interface IBoardFormModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBoardDataProps {
  board: IBoardObjectProps
}

export interface ICreateBoardProps {
  name: string;
  columns: {
    name: string;
    tasks: []
  }[];
  boards: IBoardObjectProps[]
}

export interface IUpdateBoardProps extends ICreateBoardProps {
  board: IBoardObjectProps
};
