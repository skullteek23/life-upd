import express from 'express';
import cors from 'cors';
import postRouter from './features/posts/posts.route';
import authRouter from './features/auth/auth.route';
import userRouter from './features/users/users.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/posts', postRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

export default app;