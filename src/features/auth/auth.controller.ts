import { type Request, type Response } from 'express';
import { signupWithUsername, loginWithUsername } from './auth.service';

export async function handleLogin(req: Request, res: Response) {
    const body = req.body;
    const status = await loginWithUsername(body);
    if (status.error) {
        res.status(400).send({ msg: `Error: ${status.error.toUpperCase()}` })
    } else if (status.response) {
        res.status(200).send({ token: status.response })
    } else {
        res.status(500).send('Login failed')
    }
}

export async function handleSignup(req: Request, res: Response) {
    const body = req.body;
    const status = await signupWithUsername(body);
    if (status.error) {
        return res.status(400).send({ msg: `Error: ${status.error.toUpperCase()}` });
    } else if (status.response) {
        return res.send({ token: status.response });
    } else {
        res.status(500).send('Signup failed')
    }
}