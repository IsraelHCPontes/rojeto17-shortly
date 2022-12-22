import express from 'express';
import cors from "cors";
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'


const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running in port ${port}`));