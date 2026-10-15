import { type Request, type Response } from 'express';
import { signupWithUsername, loginWithUsername } from './auth.service';
import { AUTH_ERRORS } from '@utils/constants';

export async function handleLogin(req: Request, res: Response) {
    const body = req.body;
    const token = await loginWithUsername(body);
    if (token) {
        return res.send({ token });
    } else {
        throw new Error(AUTH_ERRORS.loginFailure);
    }
}

export async function handleSignup(req: Request, res: Response) {
    const body = req.body;
    const token = await signupWithUsername(body);
    if (token) {
        return res.send({ token });
    } else {
        throw new Error(AUTH_ERRORS.signupFailure);
    }
}