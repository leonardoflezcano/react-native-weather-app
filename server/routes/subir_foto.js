import express from 'express';
import {uploadUserImage} from '../controllers/upload_controlers.js';

const router = express.Router();

router.put('/:id', uploadUserImage)

export default router;
