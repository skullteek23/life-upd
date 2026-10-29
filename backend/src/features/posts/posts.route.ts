import express from 'express';
import { handleCreate, handleGet, handleUpdate } from './posts.controller';
import { captureImages } from '@middleware/capture-image';
import { convertHEIF } from '@middleware/convert-image';
import { handlePostError, handleAuthError } from '@middleware/error.middleware';
import { parseToken } from '@middleware/parse-token.middleware';

const router = express.Router();

router.get('/', parseToken({ isRequired: false }), handleAuthError(), handleGet);

router.get('/:postId', parseToken({ isRequired: true }), handleAuthError(), handleGet);

router.post('/', parseToken({ isRequired: true }), handleAuthError(), captureImages(), convertHEIF(), handleCreate);

router.patch('/:postId', parseToken({ isRequired: true }), handleAuthError(), handleUpdate);

router.use(handlePostError());

export default router;