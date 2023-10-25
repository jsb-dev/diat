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
    await deleteUserDiagramNodes(query);
    res.status(200).json({ message: 'Nodes deleted successfully' });
  } catch (error) {
    console.error(error);
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
