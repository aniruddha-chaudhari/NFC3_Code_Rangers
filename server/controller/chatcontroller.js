// controllers/chatController.js
import { io } from '../server.js';

export const chatController = {
  sendMessage: (req, res) => {
    const { message, userId } = req.body;
    
    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    io.emit('chat message', { message, userId });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  },
};