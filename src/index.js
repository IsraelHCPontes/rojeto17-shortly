import express from 'express';
import cors from "cors";
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import urlRouter from  './routes/urlRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(urlRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));