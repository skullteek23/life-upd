import { type Request, type Response } from 'express';
import {
    getAllPosts, getPostsByUser, uploadPost
} from './posts.service';

export function handleGet(req: Request, res: Response) {
    const authID = Number(req.headers['x-user-id'])
    if (Number(req.query.pvt) === 1) {
        return handlePrivate(req, res, authID);
    } else {
        return handleAll(req, res);
    }
}

export async function handleCreate(req: Request, res: Response) {
    const postOwnerId = Number(req.headers['x-user-id']);
    if (await uploadPost(req.body, postOwnerId)) {
        res.send('Post added!')
    } else {
        res.status(400).send('Invalid Post!');
    }
}

async function handleAll(req: Request, res: Response) {
    const result = await getAllPosts();
    result.length ?
        res.json(result) :
        res.status(404).send('No posts available!');
}

async function handlePrivate(req: Request, res: Response, userId: number) {
    if (req.params.userId && !isNaN(userId)) {
        const result = await getPostsByUser(userId);
        result.length ?
            res.json(result) :
            res.status(404).send('No post by this user!');
    } else {
        res.status(400).send('Invalid Params!');
    }
}
