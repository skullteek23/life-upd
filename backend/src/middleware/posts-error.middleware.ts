import { type Request, type Response, type NextFunction } from 'express';
import { POST_ERRORS, MULTER_ERRORS, HEIC_ERRORS } from '@utils/constants';

export function handlePostError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            next();
        }
        switch (err.message) {

            // General
            case POST_ERRORS.invalidPayload:
                return res.status(400).json({ error: '[POST] Invalid payload' });
            case POST_ERRORS.invalidFile:
                return res.status(400).json({ error: '[POST] Invalid file' });
            case POST_ERRORS.imageNotSupport:
                return res.status(415).json({ error: '[POST] Image not supported' })
            case POST_ERRORS.imageNotProcessable:
                return res.status(422).json({ error: '[POST] Image not saved' });
            case POST_ERRORS.imageNotCompressible:
                return res.status(422).json({ error: '[POST] Image not saved' });

            // Multer related
            case MULTER_ERRORS.imageNotSupport:
                return res.status(415).json({ error: '[POST] Image not supported' })
            case MULTER_ERRORS.fileTooBig:
                return res.status(413).json({ error: '[POST] Image too large' })
            case MULTER_ERRORS.unexpectedFile:
                return res.status(400).json({ error: '[POST] Image not saved' })
            case POST_ERRORS.uploadFailed:
                return res.status(500).json({ error: '[POST] Post not saved' })
            case MULTER_ERRORS.uploadFailed:
                return res.status(500).json({ error: '[POST] Image not saved' })

            // HEIC/HEIF related
            case HEIC_ERRORS.conversionFailed:
                return res.status(415).json({ error: '[POST] Image not supported' })

            // Default error
            default:
                return res.status(500).json({ error: `[POST] Failed! Try again later` })
        }
    }
};
