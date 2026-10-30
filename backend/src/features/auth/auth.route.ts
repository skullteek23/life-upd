import express from 'express';
import { handleLogin, handleSignup } from './auth.controller';
import { handleAuthError } from '@middleware/error.middleware';

const router = express.Router();

router.post('/login', handleLogin)
router.post('/signup', handleSignup)

router.use(handleAuthError());

export default router;