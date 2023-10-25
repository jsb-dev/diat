import express from 'express';
import getUserCredentials from '../controllers/user/getUserCredentials.js';
import getUserDiagram from '../controllers/user/getUserDiagram.js';
import userPostDiagramRouter from './user-sub-routers/user-post-diagram-router.js';
import userDeleteDiagramRouter from './user-sub-routers/user-delete-diagram-router.js';

const userRouter = express.Router();

userRouter.get('/get/credentials', getUserCredentials);
userRouter.get('/get/diagram', getUserDiagram);
userRouter.use('/post/diagram', userPostDiagramRouter);
userRouter.use('/delete/diagram', userDeleteDiagramRouter);

export default userRouter;
