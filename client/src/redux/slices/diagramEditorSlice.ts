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
    addDocNode: (state, action: PayloadAction<{ type: string, x: number, y: number }>) => {
      state.action = 'addDocNode';
      state.payload = action.payload;
    },
    addEdge: (state, action: PayloadAction<{ source: string, sourceHandle: string, target: string, targetHandle: string }>) => {
      state.action = 'addEdge';
      state.payload = action.payload;
    },
    // TODO: Add more reducers for "Add Image" and "Add URL" later
  },
});

export const { addDocNode, addEdge } = diagramEditorSlice.actions;

export default diagramEditorSlice.reducer;
