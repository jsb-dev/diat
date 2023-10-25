import express from 'express';
import deleteUserDiagramNodes from '../../controllers/user/deleteUserDiagramNodes.js';
import deleteUserDiagramEdges from '../../controllers/user/deleteUserDiagramEdges.js';
import { acquireLock, releaseLock } from '../../utils/sharedLock.js';

const userDeleteDiagramRouter = express.Router();

const deleteProcessingQueue = [];
let isDeleteProcessing = false;

const processNextDeleteInQueue = async () => {
  if (isDeleteProcessing || deleteProcessingQueue.length === 0) {
    return;
  }

  isDeleteProcessing = true;

  await acquireLock();

  const { type, res, query } = deleteProcessingQueue.shift();

  try {
    if (type === 'nodes') {
      await deleteUserDiagramNodes(query);
      res
        .status(202)
        .json({ message: 'Delete request received for aggregation' });
    } else {
      await deleteUserDiagramEdges(query);
      res
        .status(202)
        .json({ message: 'Delete request received for aggregation' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting ${type}, re-aggregating request` });
  } finally {
    releaseLock();
    isDeleteProcessing = false;
    processNextDeleteInQueue();
  }
};

userDeleteDiagramRouter.delete('/nodes', async (req, res) => {
  deleteProcessingQueue.push({ type: 'nodes', res, query: req.query });
  processNextDeleteInQueue();
});

userDeleteDiagramRouter.delete('/edges', async (req, res) => {
  deleteProcessingQueue.push({ type: 'edges', res, query: req.query });
  processNextDeleteInQueue();
});

export default userDeleteDiagramRouter;
