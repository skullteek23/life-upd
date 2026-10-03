import express from 'express';
import { handleCreate, handleGet } from './posts.controller';

const router = express.Router();

router.get('/', handleGet)
router.post('/', handleCreate)

export default router;