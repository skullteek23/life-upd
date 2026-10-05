import express from 'express';
import { getUsers } from './users.controller';
import { checkToken } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', checkToken, getUsers)

export default router;