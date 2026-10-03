import express, { type Request, type Response } from 'express';
import postRouter from './features/posts/posts.route';
import authRouter from './features/auth/auth.route';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {

    // Insert HTML here
    res.send('OK');
})

app.use('/posts', postRouter);
app.use('/auth', authRouter);

export default app;