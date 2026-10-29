import { type Request, type Response, type NextFunction } from 'express';
import { AUTH_ERRORS, HEIC_ERRORS, MULTER_ERRORS, POST_ERRORS, USER_ERRORS } from '@utils/constants';

export function handleAuthError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            next();
        }
        console.log(err.message)
        switch (err.message) {
            // Auth related
            case AUTH_ERRORS.badFormat:
                return res.status(400).json({ error: 'Username/Password not valid' });
            case AUTH_ERRORS.invalidCredentials:
                return res.status(401).json({ error: 'Username/Password not valid' });
            case AUTH_ERRORS.userNotExist:
                return res.status(401).json({ error: `User doesn't exist` });
            case AUTH_ERRORS.passwordIncorrect:
                return res.status(401).json({ error: 'Username/Password not correct' });
            case AUTH_ERRORS.usernameDuplicate:
                return res.status(409).json({ error: 'User already exists' });
            case AUTH_ERRORS.tokenFailure:
                return res.status(500).json({ error: 'Authentication Failed! Try again later' });
            case AUTH_ERRORS.unauthorizedAccess:
                return res.status(401).json({ error: 'Action not allowed' });
            case AUTH_ERRORS.signupServerFailure:
                return res.status(500).json({ error: 'Authentication Failed! Try again later' });
            case AUTH_ERRORS.loginFailure:
                return res.status(500).json({ error: 'Authentication Failed! Try again later' });
            case AUTH_ERRORS.signupFailure:
                return res.status(500).json({ error: 'Authentication Failed! Try again later' });
            case AUTH_ERRORS.duplicateCheckFailed:
                return res.status(500).json({ error: 'Authentication Failed! Try again later' });

            // Default error
            default:
                return res.status(500).json({ error: `Authentication Failed! Try again later` })
        }
    }
};

export function handlePostError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            next();
        }
        console.log(err.message);
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
            case POST_ERRORS.uploadFailed:
                return res.status(500).json({ error: '[POST] Post not saved' })
            case POST_ERRORS.imgUploadFailed:
                return res.status(500).json({ error: '[POST] Image not saved' })

            // Multer related
            case MULTER_ERRORS.imageNotSupport:
                return res.status(415).json({ error: '[POST] Image not supported' })
            case MULTER_ERRORS.fileTooBig:
                return res.status(413).json({ error: '[POST] Image too large' })
            case MULTER_ERRORS.unexpectedFile:
                return res.status(400).json({ error: '[POST] Image not saved' })
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

export function handleUserError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            next();
        }
        console.log(err.message);
        switch (err.message) {
            // General
            case USER_ERRORS.duplicateUsers:
                return res.status(400).json({ error: '[User] Invalid User' });
            case USER_ERRORS.invalidUserId:
                return res.status(415).json({ error: '[User] Invalid User ID' })

            // Default error
            default:
                return res.status(500).json({ error: `[User] Failed! Try again later` })
        }
    }
};
