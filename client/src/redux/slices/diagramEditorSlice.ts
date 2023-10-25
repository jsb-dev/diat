import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiagramEditorState {
  action: string;
  payload: any;
  focusedNode?: string;
}

const initialState: DiagramEditorState = {
  action: '',
  payload: null,
  focusedNode: undefined,
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
    setFocusedNode: (state, action) => {
      state.focusedNode = action.payload;
    },
    deleteNode: (state, action: PayloadAction<{ nodeId: string}>) => {
      state.action = 'deleteNode';
      state.payload = action.payload;
    },
    clearDiagramEditorState: (state) => {
      state.action = '';
      state.payload = null;
      state.focusedNode = undefined;
    },
  },
});

export const { addDocNode, addEdge, addImgNode, addUrlNode, setFocusedNode, clearDiagramEditorState, deleteNode } = diagramEditorSlice.actions;

export default diagramEditorSlice.reducer;
