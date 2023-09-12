import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiagramEditorState {
  action: string;
  payload: any;
}

const initialState: DiagramEditorState = {
  action: '',
  payload: null,
};

const diagramEditorSlice = createSlice({
  name: 'diagramEditor',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ type: string, x: number, y: number }>) => {
      state.action = 'addNode';
      state.payload = action.payload;
    },
    addEdge: (state, action: PayloadAction<{ source: string, sourceHandle: string, target: string, targetHandle: string }>) => {
      state.action = 'addEdge';
      state.payload = action.payload;
    },
    // You can add more reducers for "Add Image" and "Add URL" later
  },
});

// Named exports for the actions
export const { addNode, addEdge } = diagramEditorSlice.actions;

// Default export for the reducer
export default diagramEditorSlice.reducer;
