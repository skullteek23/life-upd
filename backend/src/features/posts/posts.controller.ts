import { type Request, type Response } from 'express';
import {
    getPosts, uploadPost
} from './posts.service';
import { POST_ERRORS } from '@utils/constants';

export async function handleGet(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const result = await getPosts({ userId, ...req.query });
    if (result) {
        return res.send(result);
    } else {
        return res.status(500).send({ msg: `Failed: Unable to get posts` })
    }
}

export async function handleCreate(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const body = req.body || {};
    const file = req.file || null;
    if (body && file) {
        await uploadPost(body, file, userId);
        return res.send({ msg: `Post added successfully` })
    } else {
        throw new Error(POST_ERRORS.invalidPayload);
    }
}
