import { type Request, type Response, type NextFunction } from 'express';
import multer from 'multer';

export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).send({
                msg: 'Failed: Image must not exceed 20 MB'
            });
        }

        return res.status(400).send({
            msg: 'Failed: File upload'
        });
    }

    if (err) {
        return res.status(400).send({
            msg: 'Failed: ' + err.message
        });
    }

    next();
};