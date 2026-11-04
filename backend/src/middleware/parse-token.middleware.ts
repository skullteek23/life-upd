import { type Request, type Response, type NextFunction } from 'express';
import { AUTH_ERRORS } from '@utils/constants';
import { AccessTokenPayload } from '@features/auth/auth.type';
import Token from '@utils/jwt';

export function parseToken(opts: { isRequired: boolean }) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = process.env.TOKEN_HEADER_KEY;
        if (!key) {
            throw new Error(AUTH_ERRORS.keyNotProvided);
        }

        const token = req.headers[key];
        if (opts.isRequired && (!token || typeof token !== 'string')) {
            throw new Error(AUTH_ERRORS.tokenNotProvided);
        }

        if (token && typeof token === 'string') {
            const refreshToken = req?.cookies?.refreshToken;
            if (!refreshToken) {
                throw new Error(AUTH_ERRORS.unauthorizedAccess);
            }

            Token.verify(refreshToken, 'refresh');
            const decoded = Token.verify(token, 'access');
            const decodedTyped = decoded as AccessTokenPayload;
            if (decodedTyped?.userID) {
                req.user = {
                    userId: Number(decodedTyped?.userID)
                }
            }
        }
        return next();
    }
}