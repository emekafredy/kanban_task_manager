import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";
import sidebar from "./slices/sidebar";
import board from "./slices/board";

export const store = configureStore({
  reducer: {
    theme,
    sidebar,
    board
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
