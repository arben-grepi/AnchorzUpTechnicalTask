import mongoose from "mongoose";
import "../config.js"; // Ensure dotenv is loaded before any other imports

import debug from "debug";
const log = debug("app:log");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
