import { type Request, type Response } from 'express';
import {
    getPosts, uploadPost
} from './posts.service';
import { IStatus } from 'src/utils/models';
import { ERROR_CODES } from './posts.type';

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
        const status: IStatus = await uploadPost(body, file, userId);
        if (status.error === ERROR_CODES.imageProcessingError) {
            return res.status(500).send({ msg: `Failed: IMAGE NOT SAVED` })
        } else if (status.error === ERROR_CODES.compressionAborted) {
            return res.status(413).send({ msg: `Failed: IMAGE TOO BIG` })
        } else if (status.error) {
            return res.status(400).send({ msg: `Failed: INVALID POST` })
        } else {
            return res.send({ msg: `Success: POST ADDED` })
        }
    } else {
        return res.status(400).send({ msg: `Failed: INVALID PAYLOAD` });
    }
}
