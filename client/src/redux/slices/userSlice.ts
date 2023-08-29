import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: "",
  userId: "",
  diagramId: "",
  diagram: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDiagram: (state, action) => {
      state.diagram = action.payload;
    }
  }
});

export const { setDiagram } = userSlice.actions;

export default userSlice.reducer;
