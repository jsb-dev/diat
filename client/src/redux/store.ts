import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import diagramEditorReducer from './slices/diagramEditorSlice';
import diagramReducer from './slices/flowSlice';
import authReducer from './slices/authSlice';
import syncDiagram from './middleware/diagramSync';
import editorReducer from './slices/tiptapSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    diagram: diagramReducer,
    auth: authReducer,
    editor: editorReducer,
    diagramEditor: diagramEditorReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncDiagram)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
