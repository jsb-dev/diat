import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import diagramReducer from './slices/diagramSlice';
import authReducer from './slices/authSlice';
import syncDiagram from './middleware/diagramSync';
import editorReducer from './slices/editorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    diagram: diagramReducer,
    auth: authReducer,
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncDiagram)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
