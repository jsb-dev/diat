import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Diagram } from '../../interfaces/Diagram';
import { setUser } from './userSlice';

export const initializeDiagram = createAsyncThunk(
    'diagram/initialize',
    async (_, { dispatch, getState }) => {
      const state: any = getState();
      if (!state.diagram.data) {
        dispatch(getDiagramFromCache());
      }
    }
  );

interface DiagramState {
  data: Diagram | null;
  isCached: boolean;
}

const initialState: DiagramState = {
  data: null,
  isCached: false,
};

export const getDiagramFromCache = createAsyncThunk(
  'diagram/getFromCache',
  async () => {
    const cache = await caches.open('diagram-cache');
    const cachedResponse = await cache.match('/diagram');
    if (cachedResponse) {
      return await cachedResponse.json();
    }
    return null;
  }
);

export const setDiagramInCache = createAsyncThunk(
  'diagram/setInCache',
  async (diagram: Diagram) => {
    const cache = await caches.open('diagram-cache');
    const blob = new Blob([JSON.stringify(diagram)], { type: 'application/json' });
    await cache.put('/diagram', new Response(blob));
    return diagram;
  }
);

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    setDiagram: (state, action: PayloadAction<Diagram>) => {
      state.data = action.payload;
    },
    clearDiagram: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser, (state, action) => {
        if (action.payload.diagram) {
          state.data = action.payload.diagram;
        }
      });

    builder.addCase(getDiagramFromCache.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isCached = true;
      }
    });
  },
});

export const { setDiagram, clearDiagram } = diagramSlice.actions;

export const selectDiagram = (state: any) => state.diagram.data;

export default diagramSlice.reducer;
