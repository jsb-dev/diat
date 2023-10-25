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

const processNextInQueue = async () => {
  if (isProcessing || processingQueue.length === 0) {
    return;
  }

  isProcessing = true;

  await acquireLock();

  const { type, res } = processingQueue.shift();

  try {
    await postUserDiagramNodes(aggregatedSaveRequests);
    res.status(200).json({ message: 'Nodes saved successfully' });
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
  aggregateSaveRequests();
  processingQueue.push({ type: 'nodes', res });
  processNextInQueue();
});

// Post Edges
userPostDiagramRouter.post('/edges', async (req, res) => {
  aggregateSaveRequests();
  processingQueue.push({ type: 'edges', res });
  processNextInQueue();
});

export default userPostDiagramRouter;
