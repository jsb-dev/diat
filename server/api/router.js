import express from 'express';
import connectRouter from './routers/connect-router.js';
import userRouter from './routers/user-router.js';
import nodeRouter from './routers/node-router.js';
import contactRouter from './routers/contact-router.js';

const router = express.Router();

router.use('/connect', connectRouter);
router.use('/user', userRouter);
router.use('/node', nodeRouter);
router.use('/contact', contactRouter);

export default router;
