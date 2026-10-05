import { type Request, type Response } from 'express';
import {
    getPosts, uploadPost
} from './posts.service';

export async function handleGet(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const result = await getPosts(userId);
    if (result) {
        res.send(result);
    } else {
        res.status(500).send('Something went wrong! Try again later');
    }
}

export async function handleCreate(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const body = req.body || {};
    if (await uploadPost(body, userId)) {
        res.send('Post added!')
    } else {
        res.status(400).send('Invalid payload!');
    }
}
