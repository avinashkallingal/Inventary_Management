import mongoose from "mongoose";
import dotenv from 'dotenv';
import config from "../config";
dotenv.config();

export const dbConnection = async () => {
    try {
        console.log('database trying to connect');
        await mongoose.connect(config.DB_URL || '');
        console.log('database connected');
    } catch (error) {
        console.log('error while connecting database',error)
    }
}