import { type Request, type Response, type NextFunction } from 'express';
import { decodeToken, verifyToken } from '../utils/jwt';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const key = process.env.TOKEN_HEADER_KEY;
    if (key && req.headers[key]) {
        const token = req.headers[key];
        if (typeof token !== 'string') {
            return res.status(401).send({ msg: 'Error: ACTION NOT ALLOWED' });
        } else if (token && verifyToken(token)) {
            req.user = {
                userId: Number(decodeToken(token))
            }
            return next();
        } else {
            return res.status(401).send({ msg: 'Error: ACTION NOT ALLOWED' })
        }
    } else {
        return next();
    }
}