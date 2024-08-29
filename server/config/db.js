import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        })
        .then(() => console.log('MongoDB connected', ENV_VARS.MONGO_URI))
        .catch(err => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
};