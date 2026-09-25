import express, { type Request, type Response } from 'express';
import postRouter from './features/posts/posts.route';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {

    // Insert HTML here
    res.send('Project is running');
})

app.use('/posts', postRouter);

export default app;