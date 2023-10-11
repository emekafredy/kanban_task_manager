export interface IBoardObjectPropsResponse<T> {
  data: T;
  message: string;
}

export interface IBoardObjectProps {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[]
    }[],
  }[];
}

export interface IBoardColumnProps {
  column: {
    name: string;
    tasks: {
      title: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[]
    }[],
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
