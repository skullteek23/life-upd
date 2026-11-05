import type { Request, Response, NextFunction } from 'express';

export function delayResponse(ms = 5000) {
    return (_req: Request, _res: Response, next: NextFunction) => {
        if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
                next();
            }, ms);
        } else {
            next();
        }
    };
}