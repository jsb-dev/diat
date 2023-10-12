import express from 'express';
import postNodeUrl from '../controllers/node/postNodeUrl.js';

const nodeRouter = express.Router();

nodeRouter.post('/post/url', postNodeUrl);

export default nodeRouter;
