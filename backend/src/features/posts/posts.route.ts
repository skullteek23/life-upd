import express from 'express';
import { handleCreate, handleGet } from './posts.controller';
import { captureImages } from '@middleware/capture-image';
import { convertHEIF } from '@middleware/convert-image';
import { handlePostError } from '@middleware/posts-error.middleware';
import { checkToken } from '@middleware/token-check.middleware';
import { handleAuthError } from '@middleware/auth-error.middleware';

const router = express.Router();

router.use(checkToken());
router.use(handleAuthError())

router.get('/', handleGet);

router.use(captureImages());
router.use(convertHEIF());
router.post('/', handleCreate);

router.use(handlePostError());

export default router;