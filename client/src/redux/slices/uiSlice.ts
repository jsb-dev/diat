import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

export interface UIState {
  viewportIsVertical: boolean;
  viewportIsPortable: boolean;
}

const initialState: UIState = {
  viewportIsVertical: false,
  viewportIsPortable: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateLayout(state, action: PayloadAction<WindowSize>) {
      const { innerWidth, innerHeight } = action.payload;
      state.viewportIsVertical = innerWidth < innerHeight;
      state.viewportIsPortable = 
        (state.viewportIsVertical && innerWidth < 600) ||
        (!state.viewportIsVertical && innerWidth < 950);
    },
  },
});

export const { updateLayout } = uiSlice.actions;

export default uiSlice.reducer;
