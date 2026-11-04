import express from 'express';
import { handleLogin, handleLogout, handleRefresh, handleSignup } from './auth.controller';
import { handleAuthError } from '@middleware/error.middleware';

const router = express.Router();

router.post('/login', handleLogin)
router.post('/signup', handleSignup)
router.get('/refresh-token', handleRefresh)
router.get('/logout', handleLogout)

router.use(handleAuthError());

export default router;