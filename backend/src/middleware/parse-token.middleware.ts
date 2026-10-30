import { type Request, type Response, type NextFunction } from 'express';
import { decodeToken, verifyToken } from '../utils/jwt';
import { AUTH_ERRORS } from '@utils/constants';

export function parseToken(opts: { isRequired: boolean }) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = process.env.TOKEN_HEADER_KEY;
        if (!key) {
            throw new Error(AUTH_ERRORS.keyNotProvided);
        }

        const token = req.headers[key];
        if (opts.isRequired && (!token || typeof token !== 'string')) {
            throw new Error(AUTH_ERRORS.unauthorizedAccess);
        }

        if (token && typeof token === 'string' && verifyToken(String(token))) {
            req.user = {
                userId: Number(decodeToken(token))
            }
        }
        return next();
    }
}