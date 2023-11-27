import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

export interface UIState {
  viewportIsVertical: boolean;
  viewportIsPortable: boolean;
  appInitialised: boolean;
  isLoading: boolean;
}

const initialState: UIState = {
  viewportIsVertical: false,
  viewportIsPortable: false,
  appInitialised: false,
  isLoading: true,
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
    setAppInitialised(state) {
      state.appInitialised = true;
    },
    setIsLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { updateLayout, setAppInitialised, setIsLoading } = uiSlice.actions;

export default uiSlice.reducer;
