import { type Request, type Response } from 'express';
import { getUser } from './users.service';
import { USER_ERRORS } from '@utils/constants';

export async function handleGet(req: Request, res: Response) {
    const userId = req.user?.userId || 0;
    const result = await getUser(userId);
    if (result) {
        return res.send(result);
    } else {
        throw new Error(USER_ERRORS.getUserFailure);
    }
}