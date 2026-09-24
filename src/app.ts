import express from 'express';
import { type Request, type Response } from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {

    // Insert HTML here
    res.send('Project is running');
})

export default app;