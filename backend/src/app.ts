import express from 'express';
import path from 'path';
import cors from 'cors';
import postRouter from './features/posts/posts.route';
import authRouter from './features/auth/auth.route';
import { type Request, type Response } from 'express';
import packageJson from '../package.json';

const FRONTEND_URL = String(process.env.FRONTEND_URL) || 'http://localhost:4200';

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        version: packageJson.version
    });
})

export default app;