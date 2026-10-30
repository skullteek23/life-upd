import express from 'express';
import { handleCreate, handleGet, handleUpdate } from './posts.controller';
import { captureImages } from '@middleware/capture-image';
import { convertHEIF } from '@middleware/convert-image';
import { handlePostError, handleAuthError } from '@middleware/error.middleware';
import { parseToken } from '@middleware/parse-token.middleware';

const router = express.Router();

router.get('/', parseToken({ isRequired: false }), handleAuthError(), handleGet);

router.use(parseToken({ isRequired: true }), handleAuthError())
router.get('/:postId', handleGet);

router.use(captureImages(), convertHEIF())
router.post('/', handleCreate);
router.patch('/:postId', handleUpdate);

router.use(handlePostError());

export default router;