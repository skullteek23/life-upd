import { type Request, type Response, type NextFunction } from 'express';
import { isFileValid } from 'src/features/posts/posts.service';
import convert from 'heic-convert';

export const HEIC_TYPES = ['image/heif', 'image/heic'];

export async function captureFormats(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const file = req.file;

        if (file && isFileValid(file) && HEIC_TYPES.includes(file.mimetype)) {
            file.buffer = Buffer.from(await convert({
                buffer: file.buffer,
                format: 'JPEG',
                quality: 1
            }));
        }

        return next();
    } catch (error) {
        return next(error);
    }
}