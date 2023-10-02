import express from 'express';
import submitNodeUrl from '../controllers/node/submitNodeUrl.js';

const diagramRouter = express.Router();

diagramRouter.post('/url', submitNodeUrl);

export default diagramRouter;
