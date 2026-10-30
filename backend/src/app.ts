import express, { type Request, type Response } from 'express';
import path from 'path';
import cors from 'cors';

import postRouter from './features/posts/posts.route';
import userRouter from './features/users/users.route';
import authRouter from './features/auth/auth.route';
import packageJson from '../package.json';
import { delayResponse } from '@middleware/delay-response.middleware';

const FRONTEND_URLS = (process.env.FRONTEND_URL || 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim());

const app = express();

app.use(cors({ origin: FRONTEND_URLS }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use(delayResponse());
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        version: packageJson.version
    });
})

export default app;