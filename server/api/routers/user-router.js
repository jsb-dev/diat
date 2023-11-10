import express from 'express';
import getUserCredentials from '../controllers/user/getUserCredentials.js';
import getUserDiagram from '../controllers/user/getUserDiagram.js';
import postUserDiagram from '../controllers/user/postUserDiagram.js';
import deleteUserDiagram from '../controllers/user/deleteUserDiagram.js';
import updateUserEmail from '../controllers/user/updateUserEmail.js';

const userRouter = express.Router();

userRouter.get('/get/credentials', getUserCredentials);
userRouter.get('/get/diagram', getUserDiagram);
userRouter.post('/post/diagram', postUserDiagram);
userRouter.delete('/delete/diagram', deleteUserDiagram);
userRouter.patch('/update/email', updateUserEmail);

export default userRouter;
