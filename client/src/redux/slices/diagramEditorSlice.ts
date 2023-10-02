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
    addImgNode: (state, action: PayloadAction<{ type: string, asset: any, x: number, y: number }>) => {
      state.action = 'addImgNode';
      state.payload = action.payload;
    },
    addUrlNode: (state, action: PayloadAction<{ type: string, asset: string, x: number, y: number }>) => {
      state.action = 'addUrlNode';
      state.payload = action.payload;
    },
  },
});

export const { addDocNode, addEdge, addImgNode, addUrlNode } = diagramEditorSlice.actions;

export default diagramEditorSlice.reducer;
