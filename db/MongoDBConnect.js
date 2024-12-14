import mongoose from "mongoose";
import "../config.js"; // Ensure dotenv is loaded before any other imports

import debug from "debug";
const log = debug("app:log");

/**
 * Asynchronous function to connect to MongoDB.
 * Uses the connection URI specified in the environment variables.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB instance using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the connection host using the debug utility
    log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    // Log the error and exit the process with a failure code if the connection fails
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1); // Ensures the application halts on database connection failure
  }
};

export default connectDB; // Export the function for use in other modules
