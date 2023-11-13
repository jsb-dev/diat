import express from 'express';
import getUserCredentials from '../controllers/user/getUserCredentials.js';
import getUserDiagram from '../controllers/user/getUserDiagram.js';
import postUserDiagram from '../controllers/user/postUserDiagram.js';
import deleteUserDiagram from '../controllers/user/deleteUserDiagram.js';
import updateUserEmail from '../controllers/user/updateUserEmail.js';
import deleteUserAccount from '../controllers/user/deleteUserAccount.js';

const userRouter = express.Router();

userRouter.get('/get/credentials', getUserCredentials);
userRouter.get('/get/diagram', getUserDiagram);
userRouter.patch('/update/email', updateUserEmail);
userRouter.post('/post/diagram', postUserDiagram);
userRouter.delete('/delete/diagram', deleteUserDiagram);
userRouter.delete('/delete/account', deleteUserAccount);

export default userRouter;
