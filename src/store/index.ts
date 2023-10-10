import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";
import board from "./slices/board";
import task from "./slices/task";

export const store = configureStore({
  reducer: {
    theme,
    board,
    task
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
