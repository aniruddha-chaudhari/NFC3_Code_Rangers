import express from 'express';
import path from 'path';
import cors from 'cors';
import chatroutes from './routes/chatroute.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import petRoutes from './routes/petRoutes.js';
import authRoutes from './routes/authroute.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"]
  }
});

const port = ENV_VARS.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/pet", petRoutes);
app.use("/api/v1/chat", chatroutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});

export { io };