import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type SidebarProps = {
  visible: boolean | null;
}

const initialState: SidebarProps = {
  visible: null
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setVisibleSidebar: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    }
  },
})

export const { setVisibleSidebar } = sidebarSlice.actions

export const getSidebarState = (state: RootState): SidebarProps => {
  return state.sidebar;
}

export default sidebarSlice.reducer;
