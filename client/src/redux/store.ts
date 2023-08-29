import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import diagramReducer from './slices/diagramSlice';
import syncDiagram from './middleware/diagramSync';

const store = configureStore({
  reducer: {
    user: userReducer,
    diagram: diagramReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncDiagram)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
