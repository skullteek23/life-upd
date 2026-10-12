import express from 'express';
import path from 'path';
import cors from 'cors';
import postRouter from './features/posts/posts.route';
import authRouter from './features/auth/auth.route';
import { checkToken } from '@middleware/token-check.middleware';

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/auth', authRouter);

app.use(checkToken);
app.use('/posts', postRouter);

export default app;