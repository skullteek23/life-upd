import multer from 'multer';
import { type Request, type Response, type NextFunction } from 'express';
import { allowedTypes, MAX_INPUT_FILE_SIZE } from '@features/posts/posts.service';
import { MULTER_ERRORS } from '@utils/constants';

const storage = multer.memoryStorage();
const capture = multer({
    storage: storage,
    limits: {
        fileSize: MAX_INPUT_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else if (!file) {
            cb(null, true);
        } else {
            cb(new Error(MULTER_ERRORS.imageNotSupport));
        }
    }
});

export function captureImages() {
    const uploadSingle = capture.single('photo');

    return (req: Request, res: Response, next: NextFunction) => {
        return uploadSingle(req, res, (err: unknown) => {
            if (!err) {
                return next();
            }


            if (err instanceof multer.MulterError) {
                switch (err.code) {
                    case 'LIMIT_FILE_SIZE':
                        return next(new Error(MULTER_ERRORS.fileTooBig));

                    case 'LIMIT_UNEXPECTED_FILE':
                        return next(new Error(MULTER_ERRORS.unexpectedFile));

                    default:
                        return next(new Error(MULTER_ERRORS.uploadFailed));
                }
            }

            if (
                err instanceof Error &&
                err.message === MULTER_ERRORS.imageNotSupport
            ) {
                return next(err);
            }

            return next(new Error(MULTER_ERRORS.uploadFailed));
        });
    };
}