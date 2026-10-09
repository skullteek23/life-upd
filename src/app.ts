import express from 'express';
import cors from 'cors';
import postRouter from './features/posts/posts.route';
import authRouter from './features/auth/auth.route';
import { checkToken } from '@middleware/auth.middleware';
import { handleError } from '@middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use('/auth', authRouter);

app.use(checkToken);
app.use('/posts', postRouter);

app.use(handleError)

export default app;