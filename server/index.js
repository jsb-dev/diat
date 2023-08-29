import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database/database.js';
import connectRouter from './api/routers/connect.js';
import userRouter from './api/routers/user.js';

dotenv.config();

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
connection;

// CORS
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routers
app.use('/connect', connectRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
