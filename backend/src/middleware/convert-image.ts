import { type Request, type Response, type NextFunction } from 'express';
import { isFileValid } from 'src/features/posts/posts.service';
import convert from 'heic-convert';
import { HEIC_ERRORS } from 'src/utils/constants';

export const HEIC_TYPES = ['image/heif', 'image/heic'];

export function convertHEIF() {
    return async (req: Request, res: Response, next: NextFunction) => {
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
            return next(new Error(HEIC_ERRORS.conversionFailed));
        }
    }
}