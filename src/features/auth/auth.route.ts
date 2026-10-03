import express from 'express';
import { handleLogin, handleSignup } from './auth.controller';

const router = express.Router();

router.post('/login', handleLogin)
router.post('/signup', handleSignup)

export default router;