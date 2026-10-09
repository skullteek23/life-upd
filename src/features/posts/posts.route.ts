import express from 'express';
import { handleCreate, handleGet } from './posts.controller';
import { captureImages } from '@middleware/img-capture.middleware';
import { captureFormats } from '@middleware/img-format-capture.middleware';

const router = express.Router();

router.get('/', handleGet)

router.use(captureImages())
router.use(captureFormats)
router.post('/', handleCreate)

export default router;