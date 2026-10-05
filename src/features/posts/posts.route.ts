import express from 'express';
import { handleCreate, handleGet } from './posts.controller';
import { checkToken } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', handleGet)
router.post('/', checkToken, handleCreate)

export default router;