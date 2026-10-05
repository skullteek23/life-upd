import { type Request, type Response } from 'express';
import {
    getAllPosts, getPostsByUser, uploadPost
} from './posts.service';
import { decodeToken } from '../../utils/jwt-token';

export function handleGet(req: Request, res: Response) {
    const authID = getClientUserId(req);
    if (authID) {
        return handlePrivate(req, res, authID);
    } else {
        return handleAll(req, res);
    }
}

export async function handleCreate(req: Request, res: Response) {
    const postOwnerId = getClientUserId(req);
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
    if (userId && !isNaN(userId)) {
        const result = await getPostsByUser(userId);
        result.length ?
            res.json(result) :
            res.status(404).send('No post by this user!');
    } else {
        res.status(400).send('Invalid Params!');
    }
}

function getClientUserId(req: Request): number {
    const key = process.env.TOKEN_HEADER_KEY;
    const token = req.headers[key || ''];
    if (token) {
        const payload = decodeToken(String(token));
        return Number(payload);
    }
    return 0;
}
