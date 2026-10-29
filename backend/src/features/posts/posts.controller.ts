import { type Request, type Response } from 'express';
import {
    getPosts, updateExistingPost, uploadNewPost
} from './posts.service';
import { POST_ERRORS } from '@utils/constants';

export async function handleGet(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const result = await getPosts({ userId, ...req.query, ...req.params })
    if (result) {
        return res.send(result);
    } else {
        throw new Error(POST_ERRORS.getPostFailure);
    }
}

export async function handleCreate(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const body = req.body || {};
    const file = req.file || null;
    if (body && file) {
        await uploadNewPost(body, file, userId);
        return res.send({ msg: `Post added successfully` })
    } else {
        throw new Error(POST_ERRORS.invalidPayload);
    }
}

export async function handleUpdate(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const body = req.body || {};
    const file = req.file || null;
    if (req.params['postId'] && (body || file)) {
        const postId = Number(req.params['postId']);
        await updateExistingPost(body, file, userId, postId);
        return res.send({ msg: `Post updated successfully` })
    } else {
        throw new Error(POST_ERRORS.invalidPayload);
    }
}