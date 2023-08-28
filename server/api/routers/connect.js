import connectDb from '../controllers/connectDb.js';
import express from 'express';

const connectRouter = express.Router();

connectRouter.get('/', connectDb);

export default connectRouter;
