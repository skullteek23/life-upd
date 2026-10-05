import { type Request, type Response } from 'express';
import { signupWithUsername, isUsernameValid, isPasswordValid, isUsernameDuplicate as isUsernameUnique, loginWithUsername } from './auth.service';

export async function handleLogin(req: Request, res: Response) {
    const body = req.body;
    const status = await loginWithUsername(body);
    if (status.error) {
        res.status(400).send(status.error)
    } else if (status.response) {
        res.status(200).send(status.response)
    } else {
        res.status(500).send('Login failed')
    }
}

export async function handleSignup(req: Request, res: Response) {
    const { username, password } = req.body;
    let flag = 0;

    flag = isUsernameValid(username) ? 0 : 1;
    if (flag === 1) {
        return handleInvalid(res, 'username');
    }

    flag = isPasswordValid(password) ? 0 : 1;
    if (flag === 1) {
        return handleInvalid(res, 'password');
    }

    flag = (await isUsernameUnique(username)) ? 0 : 1;
    if (flag === 1) {
        return handleInvalid(res, 'duplicate username');
    }

    if (flag === 0) {
        const token = await signupWithUsername(username, password);
        return res.send({ token });
    }

    return handleInvalid(res, 'unknown');
}

function handleInvalid(res: Response, msg: string) {
    return res.status(400).send(`Invalid User Input: ${msg}`);
}