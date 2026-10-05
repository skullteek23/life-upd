import { type Request, type Response, type NextFunction } from 'express';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const key = process.env.TOKEN_HEADER_KEY;
    const token = req.headers[key || ''];
    if (token) {
        return next();
    } else {
        return res.status(401).send('Action not allowed!')
    }
}