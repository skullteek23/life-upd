import { type Request, type Response } from 'express';

export function handleLogin(req: Request, res: Response) {
    if (req.body.username && req.body.password) {
        res.send('Ok!');
    } else {
        res.status(401).send('Invalid credentials')
    }
}

export function handleSignup(req: Request, res: Response) {
    if (req.body.username && req.body.password) {
        res.send('Ok!');
    } else {
        res.status(401).send('Invalid credentials')
    }
}