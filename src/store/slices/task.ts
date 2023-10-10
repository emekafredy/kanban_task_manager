import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TaskProps } from '../../interfaces/task';

type TTaskProps = {
  task: TaskProps;
}

const initialState: TTaskProps = {
  task: {
    title: '',
    description: '',
    subtasks: [],
    status: ''
  }
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskProps>) => {
      state.task = action.payload;
    }
  },
})

export const { setTask } = taskSlice.actions

export const getTasksState = (state: RootState): TTaskProps => {
  return state.task
}

export default taskSlice.reducer;
