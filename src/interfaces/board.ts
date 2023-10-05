export interface IBoardObjectProps {
  name: string;
  statuses: string[];
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
      statusOrder: number;
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