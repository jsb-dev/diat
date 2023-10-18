import express from 'express';
import connectRouter from './routers/connect-router.js';
import userRouter from './routers/user-router.js';
import nodeRouter from './routers/node-router.js';

const queues = {
  '/connect': [],
  '/user': [],
  '/node': [],
};

const processQueue = (queueName) => {
  if (queues[queueName].length === 0) return;
  const nextReq = queues[queueName][0];
  nextReq._queueNext();
};

const sequentialMiddleware = (req, res, next) => {
  const queueName = req.baseUrl;
  req._queueNext = next;

  if (queues[queueName].length === 0) {
    queues[queueName].push(req);
    next();
  } else {
    queues[queueName].push(req);
  }

  res.on('finish', () => {
    queues[queueName].shift();
    processQueue(queueName);
  });
};

const router = express.Router();

router.use('/connect', sequentialMiddleware, connectRouter);
router.use('/user', sequentialMiddleware, userRouter);
router.use('/node', sequentialMiddleware, nodeRouter);

export default router;
