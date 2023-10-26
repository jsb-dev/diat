import express from 'express';
import postUserDiagramNodes from '../../controllers/user/postUserDiagramNodes.js';
import postUserDiagramEdges from '../../controllers/user/postUserDiagramEdges.js';
import {
  aggregateSaveRequests,
  aggregatedSaveRequests,
} from '../../utils/user-post-diagram-utils.js';
import saveRequestMiddleware from './middleware/saveRequestMiddleware.js';

const userPostDiagramRouter = express.Router();

userPostDiagramRouter.use(saveRequestMiddleware);

const processingQueue = [];
let isProcessing = false;

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
  if (processingQueue.length === 0 && !isProcessing) {
    return;
  }

  isProcessing = true;

  const { type, aggregatedRequests } = processingQueue.shift();

  if (type === 'aggregated') {
    try {
      await postUserDiagramNodes(aggregatedRequests);
      await postUserDiagramEdges(aggregatedRequests);
    } catch (error) {
      console.error(error);
      processingQueue.push({
        type: 'aggregated',
        aggregatedRequests: [...aggregatedRequests],
      });
    } finally {
      isProcessing = false;
      processNextInQueue();
    }
  } else if (processingQueue.length > 0) {
    isProcessing = false;
    processNextInQueue();
  } else {
    isProcessing = false;
  }
};

const handlePostRequest = async (req, res) => {
  try {
    if (req.body) {
      aggregateSaveRequests(req.body);
      flushRequestsToQueue();
    }

    if (processingQueue.length > 0) {
      processNextInQueue();
    }

    res.status(202).json({ message: 'Post request received for aggregation' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
    aggregateSaveRequests(req.body);
    flushRequestsToQueue();
    processNextInQueue();
  }
};

userPostDiagramRouter.post('/nodes', (req, res) => handlePostRequest(req, res));
userPostDiagramRouter.post('/edges', (req, res) => handlePostRequest(req, res));

export default userPostDiagramRouter;
