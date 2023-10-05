import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";
import board from "./slices/board";

export const store = configureStore({
  reducer: {
    theme,
    board
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
