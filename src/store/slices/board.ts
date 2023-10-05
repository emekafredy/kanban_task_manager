import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IBoardObjectProps } from '../../interfaces/board';

type BoardsProps = {
  boards: IBoardObjectProps[];
  boardName: string;
  board: IBoardObjectProps
}

const initialState: BoardsProps = {
  boards: [],
  boardName: '',
  board: {
    name: '',
    statuses: [],
    columns: []
  }
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoardObjectProps[]>) => {
      state.boards = action.payload;
    },
    setSingleBoard: (state, action: PayloadAction<IBoardObjectProps>) => {
      state.board = action.payload;
    },
    setBoardName: (state, action: PayloadAction<string>) => {
      state.boardName = action.payload;
    }
  },
})

export const { setBoards, setBoardName, setSingleBoard } = boardSlice.actions

export const getAllBoardsState = (state: RootState): BoardsProps => {
  return state.board
}

export default boardSlice.reducer;
