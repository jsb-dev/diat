import express from 'express';
import postUserDiagramNodes from '../../controllers/user/postUserDiagramNodes.js';
import postUserDiagramEdges from '../../controllers/user/postUserDiagramEdges.js';
import {
  aggregateRequests,
  aggregatedRequests,
} from '../../utils/api/post-user-diagram-utils.js';
import requestMiddleware from '../../middleware/requestMiddleware.js';

const userPostDiagramRouter = express.Router();

userPostDiagramRouter.use(requestMiddleware);

// Processing queue
const processingQueue = [];
let isProcessing = false;

const processNextInQueue = async () => {
  if (isProcessing || processingQueue.length === 0) {
    return;
  }

  isProcessing = true;
  const { type, res } = processingQueue.shift();

  try {
    if (type === 'nodes') {
      await postUserDiagramNodes(aggregatedRequests);
      res.status(200).json({ message: 'Nodes saved successfully' });
    } else {
      await postUserDiagramEdges(aggregatedRequests);
      res.status(200).json({ message: 'Edges saved successfully' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error saving ${type}, re-aggregating request` });
  } finally {
    isProcessing = false;
    processNextInQueue();
  }
};

// Post Nodes
userPostDiagramRouter.post('/nodes', async (req, res) => {
  aggregateRequests();
  processingQueue.push({ type: 'nodes', res });
  processNextInQueue();
});

// Post Edges
userPostDiagramRouter.post('/edges', async (req, res) => {
  aggregateRequests();
  processingQueue.push({ type: 'edges', res });
  processNextInQueue();
});

export default userPostDiagramRouter;
