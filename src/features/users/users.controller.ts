import { type Request, type Response } from 'express';
import { decodeToken } from '../../utils/jwt-token';
import { getAllUsers } from './users.service';

export async function getUsers(req: Request, res: Response) {
    const authID = getClientUserId(req);
    if (authID) {
        res.send(await getAllUsers());
    } else {
        res.status(401).send('Action not allowed')
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
