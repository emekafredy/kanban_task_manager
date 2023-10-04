import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type ThemeProps = {
  colorTheme: string;
}

const initialState: ThemeProps = {
  colorTheme: ''
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorTheme: (state, action: PayloadAction<string>) => {
      state.colorTheme = action.payload;
    }
  },
})

export const { setColorTheme } = themeSlice.actions

export const getThemeState = (state: RootState): ThemeProps => {
  return state.theme;
}

export default themeSlice.reducer;
