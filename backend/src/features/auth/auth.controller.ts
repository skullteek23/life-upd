import { CookieOptions, type Request, type Response } from 'express';
import { signupWithUsername, loginWithUsername, validateTokens, REFRESH_TOKEN_COOKIE_KEY } from './auth.service';
import { AUTH_ERRORS } from '@utils/constants';
import { clear } from 'console';

export async function handleLogin(req: Request, res: Response) {
    const body = req.body;
    const { accessToken, refreshToken } = await loginWithUsername(body);
    if (accessToken && refreshToken) {
        return res
            .cookie('refreshToken', refreshToken, getCookieOptions())
            .send({ token: accessToken });
    } else {
        throw new Error(AUTH_ERRORS.loginFailure);
    }
}

export async function handleSignup(req: Request, res: Response) {
    const body = req.body;
    const { accessToken, refreshToken } = await signupWithUsername(body);
    if (accessToken && refreshToken) {
        return res
            .cookie('refreshToken', refreshToken, getCookieOptions())
            .send({ token: accessToken });
    } else {
        throw new Error(AUTH_ERRORS.signupFailure);
    }
}

export async function handleRefresh(req: Request, res: Response) {
    const existingToken = req?.cookies?.refreshToken;
    if (!existingToken) {
        throw new Error(AUTH_ERRORS.unauthorizedAccess);
    }

    const { accessToken, refreshToken } = validateTokens(existingToken);
    if (accessToken && refreshToken) {
        return res
            .cookie('refreshToken', refreshToken, getCookieOptions())
            .send({ token: accessToken });
    } else {
        throw new Error(AUTH_ERRORS.unauthorizedAccess);
    }
}

export async function handleLogout(req: Request, res: Response) {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY, getCookieOptions());
    return res.status(200).json({
        message: 'Logged out successfully',
    });
}

export function getCookieOptions(): CookieOptions {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }
}