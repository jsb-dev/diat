import express from 'express';
import getUserCredentials from '../controllers/user/getUserCredentials.js';
import getUserDiagram from '../controllers/user/getUserDiagram.js';
import postUserDiagram from '../controllers/user/postUserDiagram.js';

const userRouter = express.Router();

userRouter.get('/get/credentials', getUserCredentials);
userRouter.get('/get/diagram', getUserDiagram);
userRouter.post('/post/diagram', postUserDiagram);

export default userRouter;
