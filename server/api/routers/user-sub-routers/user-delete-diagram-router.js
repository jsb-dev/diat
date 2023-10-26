import express from 'express';
import deleteUserDiagramNodes from '../../controllers/user/deleteUserDiagramNodes.js';
import deleteUserDiagramEdges from '../../controllers/user/deleteUserDiagramEdges.js';
import {
  aggregateDeleteRequests,
  aggregatedDeleteRequests,
} from '../../utils/user-delete-diagram-utils.js';
import deleteRequestMiddleware from './middleware/deleteRequestMiddleware.js';

const userDeleteDiagramRouter = express.Router();

userDeleteDiagramRouter.use(deleteRequestMiddleware);

const deleteProcessingQueue = [];
let isDeleteProcessing = false;

const flushDeletesToQueue = () => {
  if (aggregatedDeleteRequests.length > 0) {
    deleteProcessingQueue.push({
      type: 'aggregated',
      aggregatedRequests: [...aggregatedDeleteRequests],
    });
    aggregatedDeleteRequests.length = 0;
  }
};

const processNextDeleteInQueue = async () => {
  if (isDeleteProcessing || deleteProcessingQueue.length === 0) {
    return;
  }

  isDeleteProcessing = true;

  const { type, aggregatedRequests } = deleteProcessingQueue.shift();

  if (type === 'aggregated') {
    {
      try {
        await deleteUserDiagramNodes(aggregatedRequests);
        await deleteUserDiagramEdges(aggregatedRequests);
      } catch (error) {
        console.error(error);
        deleteProcessingQueue.push({
          type: 'aggregated',
          aggregatedRequests: [...aggregatedRequests],
        });
      } finally {
        isDeleteProcessing = false;
        processNextDeleteInQueue();
      }
    }
  } else if (deleteProcessingQueue.length > 0) {
    isDeleteProcessing = false;
    processNextDeleteInQueue();
  } else {
    isDeleteProcessing = false;
  }
};

// Delete Nodes
userDeleteDiagramRouter.delete('/nodes', async (req, res) => {
  try {
    if (req.query) {
      aggregateDeleteRequests(req.query);
      flushDeletesToQueue();
    }

    if (deleteProcessingQueue.length > 0) {
      processNextDeleteInQueue();
    }

    res
      .status(202)
      .json({ message: 'Delete request received for aggregation' });
  } catch {
    aggregateDeleteRequests(req.query);
    flushDeletesToQueue();
    processNextDeleteInQueue();
  }
});

// Delete Edges
userDeleteDiagramRouter.delete('/edges', async (req, res) => {
  try {
    if (req.query) {
      aggregateDeleteRequests(req.query);
      flushDeletesToQueue();
    }

    if (deleteProcessingQueue.length > 0) {
      processNextDeleteInQueue();
    }

    res
      .status(202)
      .json({ message: 'Delete request received for aggregation' });
  } catch {
    aggregateDeleteRequests(req.query);
    flushDeletesToQueue();
    processNextDeleteInQueue();
  }
});

export default userDeleteDiagramRouter;
