import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IBoardObjectProps } from '../../interfaces/board';

type BoardsProps = {
  boards: IBoardObjectProps[];
}

const initialState: BoardsProps = {
  boards: [],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoardObjectProps[]>) => {
      state.boards = action.payload;
    }
  },
})

export const { setBoards } = boardSlice.actions

export const getAllBoardsState = (state: RootState): BoardsProps => {
  return state.board
}

export default boardSlice.reducer;
