import express from 'express';
import postUserDiagramNodes from '../../controllers/user/postUserDiagramNodes.js';
import postUserDiagramEdges from '../../controllers/user/postUserDiagramEdges.js';
import {
  aggregateSaveRequests,
  aggregatedSaveRequests,
} from '../../utils/post-user-diagram-utils.js';
import saveRequestMiddleware from './middleware/saveRequestMiddleware.js';
import { acquireLock, releaseLock } from '../../utils/sharedLock.js';

const userPostDiagramRouter = express.Router();

userPostDiagramRouter.use(saveRequestMiddleware);

const processingQueue = [];
let isProcessing = false;
let aggregationTimer = null;

const flushRequestsToQueue = () => {
  if (aggregatedSaveRequests.length > 0) {
    processingQueue.push({
      type: 'aggregated',
      aggregatedRequests: [...aggregatedSaveRequests],
    });
    aggregatedSaveRequests.length = 0;
  }
};

const processNextInQueue = async () => {
  if (isProcessing || processingQueue.length === 0) {
    return;
  }

  isProcessing = true;

  await acquireLock();

  const { type, aggregatedRequests } = processingQueue.shift();

  try {
    if (type === 'aggregated') {
      await postUserDiagramNodes(aggregatedRequests);
      await postUserDiagramEdges(aggregatedRequests);
    }
  } catch (error) {
    console.error(error);
  } finally {
    releaseLock();
    isProcessing = false;
    processNextInQueue();
  }
};

// Post Nodes
userPostDiagramRouter.post('/nodes', async (req, res) => {
  aggregateSaveRequests(req.body);

  if (!aggregationTimer) {
    aggregationTimer = setTimeout(() => {
      flushRequestsToQueue();
      processNextInQueue();
      aggregationTimer = null;
    }, 3000);
  }

  res.status(202).json({ message: 'Post request received for aggregation' });
});

// Post Edges
userPostDiagramRouter.post('/edges', async (req, res) => {
  aggregateSaveRequests(req.body);

  if (!aggregationTimer) {
    aggregationTimer = setTimeout(() => {
      flushRequestsToQueue();
      processNextInQueue();
      aggregationTimer = null;
    }, 3000);
  }

  res.status(202).json({ message: 'Post request received for aggregation' });
});

export default userPostDiagramRouter;
