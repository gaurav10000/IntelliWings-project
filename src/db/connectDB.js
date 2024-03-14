import mongoose from "mongoose";
import {dbName} from "../constants.js";


export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
            dbName: dbName
        });
        console.log(`MongoDB connected to: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}