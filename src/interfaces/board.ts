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
  statuses: string[];
};

export interface IBoardFormModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBoardDataProps {
  board: IBoardObjectProps
}
