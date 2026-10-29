import express from 'express';
import { handleAuthError, handleUserError } from '@middleware/error.middleware';
import { handleGet } from './users.controller';
import { parseToken } from '@middleware/parse-token.middleware';

const router = express.Router();

router.get('/describe-user', parseToken({ isRequired: true }), handleAuthError(), handleGet);

router.use(handleUserError());

export default router;