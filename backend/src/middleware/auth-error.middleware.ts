import { type Request, type Response, type NextFunction } from 'express';
import { AUTH_ERRORS } from 'src/utils/constants';

export function handleAuthError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            next();
        }
        switch (err.message) {
            // Auth related
            case AUTH_ERRORS.badFormat:
                return res.status(400).json({ error: '[User] Username/Password not valid' });
            case AUTH_ERRORS.invalidCredentials:
                return res.status(401).json({ error: '[User] Username/Password not valid' });
            case AUTH_ERRORS.userNotExist:
                return res.status(401).json({ error: `[User] User doesn't exist` });
            case AUTH_ERRORS.passwordIncorrect:
                return res.status(401).json({ error: '[User] Username/Password not correct' });
            case AUTH_ERRORS.tokenFailure:
                return res.status(500).json({ error: '[User] Failed! Try again later' });
            case AUTH_ERRORS.signupServerFailure:
                return res.status(500).json({ error: '[User] Failed! Try again later' });
            case AUTH_ERRORS.loginFailure:
                return res.status(500).json({ error: '[User] Failed! Try again later' });
            case AUTH_ERRORS.signupFailure:
                return res.status(500).json({ error: '[User] Failed! Try again later' });
            case AUTH_ERRORS.usernameDuplicate:
                return res.status(409).json({ error: '[User] User already exists' });
            case AUTH_ERRORS.duplicateCheckFailed:
                return res.status(500).json({ error: '[User] Failed! Try again later' });

            // Default error
            default:
                return res.status(500).json({ error: `Authentication Failed! Try again later` })
        }
    }
};