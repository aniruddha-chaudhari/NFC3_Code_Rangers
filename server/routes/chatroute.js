import express from 'express';
import { chatController } from '../controller/chatcontroller.js';

const router = express.Router();

router.post('/send', chatController.sendMessage);

export default router;