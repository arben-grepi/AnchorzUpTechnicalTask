const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const debug = require("debug"); // Debugging utility
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

module.exports = connectDB;
