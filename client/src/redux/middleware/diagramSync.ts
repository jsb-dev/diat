import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
import { Diagram } from '../../interfaces/Diagram';

const SYNC_INTERVAL = 60 * 1000;

let syncTimer: NodeJS.Timeout | null = null;

const syncMiddleware: Middleware = store => next => action => {
  let result = next(action);

  if (!syncTimer) {
    syncTimer = setInterval(() => {
      const currentDiagramState = (store.getState() as RootState).diagram.data;

      if (currentDiagramState) {
        syncToCache(currentDiagramState);
      }
    }, SYNC_INTERVAL);
  }

  return result;
};

const syncToCache = async (diagram: Diagram) => {
  const cache = await caches.open('diagram-cache');
  const blob = new Blob([JSON.stringify(diagram)], { type: 'application/json' });
  await cache.put('/diagram', new Response(blob));
};

export default syncMiddleware;
