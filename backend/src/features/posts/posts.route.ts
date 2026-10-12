import express from 'express';
import { handleCreate, handleGet } from './posts.controller';
import { captureImages } from '@middleware/capture-image';
import { convertHEIF } from '@middleware/convert-image';
import { handlePostError } from '@middleware/posts-error.middleware';

const router = express.Router();

router.get('/', handleGet);

router.use(captureImages());
router.use(convertHEIF());
router.post('/', handleCreate);

router.use(handlePostError());

export default router;