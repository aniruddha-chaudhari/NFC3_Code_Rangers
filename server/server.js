import express from 'express';
import path from 'path';

import petRoutes from './routes/petRoutes.js';
import authRoutes from './routes/authroute.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';



const app = express();
const port = ENV_VARS.PORT;



app.use(express.json());
app.use(cookieParser());   

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/pet",petRoutes);



app.listen(port, () => {
    connectDB();
});




