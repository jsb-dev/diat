import express from 'express';
import connectRouter from './routers/connect-router.js';
import userRouter from './routers/user-router.js';
import diagramRouter from './routers/diagram-router.js';

const router = express.Router();

router.use('/connect', connectRouter);
router.use('/user', userRouter);
router.use('/diagram', diagramRouter);

export default router;
